function makeArea(shape: any) {
  return shape.getArea();
}

class Rectangle {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

const reactangle = new Rectangle(20, 30);

makeArea(rect);
makeArea(circle);

export {};
