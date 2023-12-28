// type Direction = "left" | "right" | "center" | "top" | "bottom";

enum Direction {
  left,
  right,
  top,
  bottom,
}

function turnDirection(direction: Direction) {
  switch (direction) {
    case Direction.left:
      console.log("left");
      break;
    case Direction.right:
      console.log("right");
      break;
    case Direction.top:
      console.log("top");
      break;
    case Direction.bottom:
      console.log("bottom");
      break;
    default:
      break;
  }
}

turnDirection(Direction.left);
turnDirection(Direction.right);
turnDirection(Direction.top);
turnDirection(Direction.bottom);
