import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { InputAutocompleteConfiguration } from 'src/app/models/input-autocomplete.model';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss']
})
export class InputAutocompleteComponent implements OnInit {
  @Input() configuration: InputAutocompleteConfiguration = new InputAutocompleteConfiguration("fa-list",false,false, true,"");
  @Input() filterElements: any[];
  @Input() totalElements: any[];
  @Input() focus: boolean;
  @Input() typeElements: string;
  @Input() allBorderRadius: boolean;
  @Input() placeholder: string;
  @Input() ruleToDisabled: boolean;
  @Input() filterFunction: (search, items) => any;
  @Output() select = new EventEmitter<any>();
  @Output() create = new EventEmitter<any>();
  @Output() getTitle = new EventEmitter<any>();
  @ContentChild('itemsTemplate') itemsTemplate!: TemplateRef<any>;

  filter = 'Example Filter Data'; // Your filter data here

  ngOnInit(): void {
    document.addEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick() {
    const elements = document.getElementsByClassName('suggestions');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const inputElement = element.parentElement.querySelectorAll("input")[0];
      if (!(event.target instanceof HTMLElement) || !inputElement.contains(event.target)) {
        element.classList.remove('suggestions-show');
      }
    }
  }

  handleInput(event: any, init = false) {
    this.filterElements = this.filterFunction(this.configuration.value, this.totalElements);
    if (this.filterElements.length == 0){
      this.configuration.icon = "fa-xmark";
    } else {
      this.configuration.icon = "fa-list";
    }
    this.configuration.verified = false;
    this.select.emit(null);
  }

  changeStatusInput(filterElement) {
    this.configuration.value = filterElement.title;
    this.configuration.icon = "fa-circle-check";
    this.configuration.verified = true;
    this.select.emit(filterElement);
  }

  focusInput(event: any) {
    this.focus = true;
    const input = event.target as HTMLInputElement;
    const parentInput = input.parentElement;
    const divElements = parentInput.getElementsByClassName('suggestions')[0];
    divElements.classList.add('suggestions-show');
  };

  getTitleData(filterElement) {
    this.getTitle.emit({ filterElement });
    return filterElement.title;
  }
}