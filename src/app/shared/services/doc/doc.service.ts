import { Injectable } from '@angular/core';

declare var _;

@Injectable()
export class DocService {

  currentDoc: any = {
    name: ''
  };

  docs: any = [];

  setDoc(data: any) {
    this.currentDoc = data;
    for (let i in this.docs) {
      if (this.docs[i].id == data.id) {
        this.docs[i] = _.cloneDeep(data);
      }
    };

  }

  addDoc(doc: any) {
    this.docs.unshift(doc);
  }

  setDocs(data: any) {
    this.docs = data;
  }

}
