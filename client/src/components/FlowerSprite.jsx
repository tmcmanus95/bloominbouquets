import grass from "../assets/flowersprites/grass.png";
import dandelion from "../assets/flowersprites/dandelion.png";
import daisy from "../assets/flowersprites/daisy.png";
import lily from "../assets/flowersprites/lily.png";
import tulip from "../assets/flowersprites/tulip.png";
import sunflower from "../assets/flowersprites/sunflower.png";
import azalea from "../assets/flowersprites/azalea.png";
import rose from "../assets/flowersprites/rose.png";
import orchid from "../assets/flowersprites/orchid.png";
import goldenrose from "../assets/flowersprites/goldenrose.png";

export default function FlowerSprite({ wordLength }) {
  function setFlowerForWordLength(wordLength) {
    let flower;
    switch (wordLength) {
      case 3:
        flower = grass;
        break;
      case 4:
        flower = dandelion;
        break;
      case 5:
        flower = daisy;
        break;
      case 6:
        flower = lily;
        break;
      case 7:
        flower = tulip;
        break;
      case 8:
        flower = sunflower;
        break;
      case 9:
        flower = azalea;
        break;
      case 10:
        flower = rose;
        break;
      case 11:
        flower = orchid;
        break;
      case 12:
        flower = goldenrose;
        break;
      default:
        flower = null;
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
