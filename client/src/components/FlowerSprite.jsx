import seed from "../../public/flowersprites/seed.png";
// import sprout from "../assets/flowersprites/sprout.png";
// import grass from "../assets/flowersprites/grass.png";
// import dandelion from "../assets/flowersprites/dandelion.png";
// import daisy from "../assets/flowersprites/daisy.png";
// import lily from "../assets/flowersprites/lily.png";
// import tulip from "../assets/flowersprites/tulip.png";
// import sunflower from "../assets/flowersprites/sunflower.png";
// import azalea from "../assets/flowersprites/azalea.png";
// import rose from "../assets/flowersprites/rose.png";
// import orchid from "../assets/flowersprites/orchid.png";
// import goldenrose from "../assets/flowersprites/goldenrose.png";

export default function FlowerSprite({ wordLength }) {
  function setFlowerForWordLength(wordLength) {
    let flower;
    switch (wordLength) {
      case 0:
        flower = null;
        break;
      case 1:
        flower = "/flowersprites/seed.png";
        break;
      case 2:
        flower = "/flowersprites/sprout.png";
        break;
      case 3:
        flower = "/flowersprites/grass.png";
        break;
      case 4:
        flower = "/flowersprites/dandelion.png";
        break;
      case 5:
        flower = "/flowersprites/daisy.png";
        break;
      case 6:
        flower = "/flowersprites/lily.png";
        break;
      case 7:
        flower = "/flowersprites/tulip.png";
        break;
      case 8:
        flower = "/flowersprites/sunflower.png";
        break;
      case 9:
        flower = "/flowersprites/azalea.png";
        break;
      case 10:
        flower = "/flowersprites/rose.png";
        break;
      case 11:
        flower = "/flowersprites/orchid.png";
        break;
      case 12:
        flower = "/flowersprites/goldenrose.png";
        break;
      default:
        flower = "/flowersprites/goldenrose.png";
        break;
    }
    return flower;
  }

  const selectedFlower = setFlowerForWordLength(wordLength);

  if (!selectedFlower) {
    return null;
  }

  return <img src={selectedFlower} alt="flower" />;
}
