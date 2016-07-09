export class Document {
  name: string;
  createdAt: Date;
  id: string;
  modifiedAt: Date;
  url: string;
  body: string;

  constructor(doc: any) {
    this.name = doc.name;
    this.url = doc.url;
    this.body = doc.body || '';
    this.createdAt = new Date(doc.created_at) || new Date();
    this.modifiedAt = new Date(doc.modified_at) || new Date();
  }
}
