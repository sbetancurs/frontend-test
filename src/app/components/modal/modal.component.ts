import {
  Component,
  ViewEncapsulation,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ComicService } from '@services/comic.service';
import { ModalService } from './modal.service';

import { Comic } from '@models/comic';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  comicUri: string;
  comic: Comic;
  private element: any;

  constructor(
    private client: ComicService,
    private modalService: ModalService,
    private el: ElementRef
  ) {
    this.element = el.nativeElement;
    this.comic = {
      id: 0,
      title: '',
      description: '',
      resourceURI: '',
      prices: [{ type: '', price: 3900 }],
      thumbnail: {
        path: '',
        extension: '',
      },
    };
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el) => {
      if (el.target.className === 'modal') {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  getComicInfo = () => {
    this.client.getOne(this.comicUri).subscribe((response) => {
      //@ts-ignore
      this.comic = response.data.results[0];
    });
  };

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.getComicInfo();
    this.element.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
}
