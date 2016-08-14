import { Injectable } from '@angular/core';

declare var _;

@Injectable()
export class DocService {

  currentDoc: any = {
    name: ''
  };

  docs: any = [];

  setDoc(doc: any) {
    this.currentDoc = doc;
    for (let i in this.docs) {
      if (this.docs[i].id == doc.id) {
        this.docs[i] = _.cloneDeep(doc);
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
