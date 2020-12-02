export default class TodoImage {
  id:number;
  imageUrl: string;
  constructor(data:any) {
    this.id = data['id'];
    this.imageUrl = data['image_url'];
  }
}