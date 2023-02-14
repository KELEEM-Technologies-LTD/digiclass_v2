import mtn from "./../../assets/svgs/mtnlogo.svg";
import voda from "./../../assets/svgs/vodafone.png";
import airteltigo from "./../../assets/svgs/airteltigo.png";

export const getNetworkLogo = (network) => {
  let netw = null;
  switch (network) {
    case "MTN":
      netw = mtn;
      break;

    case "VODAFONE":
      netw = voda;
      break;

    case "AIRTELTIGO":
      netw = airteltigo;
      break;

    default:
      break;
  }

  return netw;
};
