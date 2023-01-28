let img = new Image();
img.src = "/img/sand.jpg";

img.onload = function () {
  let pat = ctx.createPattern(this, "repeat");
  /* let pat2 = ctx. */

  BigCircle.arc(
    canvas.height * 0.5,
    canvas.height * 0.5,
    canvas.height * 0.5,
    0.5 * Math.PI,
    1.5 * Math.PI
  );
  BigCircle.arc(
    canvas.width - canvas.height * 0.5,
    canvas.height * 0.5,
    canvas.height * 0.5,
    1.5 * Math.PI,
    2.5 * Math.PI
  );
  BigCircle.closePath();
  ctx.stroke(BigCircle);
  ctx.fillStyle = pat;
  ctx.fill(BigCircle);

  SmallCircle.arc(200, canvas.height / 2, 100, 0.5 * Math.PI, 1.5 * Math.PI);
  SmallCircle.arc(
    canvas.width - canvas.height * 0.5,
    canvas.height * 0.5,
    100,
    1.5 * Math.PI,
    2.5 * Math.PI
  );
  SmallCircle.closePath();
  ctx.stroke(SmallCircle);
  ctx.fillStyle = "blue";
  ctx.fill(SmallCircle);

  Start.rect(400, 300, 5, 100);
  Start.closePath();
  ctx.stroke(Start);
  ctx.fillStyle = "#000000";
  ctx.fill(Start);
};
