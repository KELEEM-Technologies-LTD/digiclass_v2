import React from "react";

function VisaCard() {
  const selected = true;

  return (
    <div
      // onClick={() => handleSelectedCard(details)}
      className={`${
        selected ? " border-4 border-white" : ""
      } relative px-2 py-8 rounded-8 flex flex-col justify-between cursor-pointer`}
      style={{background: '#'+Math.floor(Math.random()*16777215).toString(16)}}
    >
      <div className="absolute bottom-0">
        <img src="./img/visabg.png" alt="visabg" />
      </div>
      <div className="flex justify-end">
        <img src="./img/visa.svg" alt="visacard" />
      </div>
      <div className="flex justify-evenly gap-2 items-center mt-6">
        <div className="flex gap-1 items-center">
          <div className=" h-2 w-2 rounded-full bg-white"></div>
          <div className=" h-2 w-2 rounded-full bg-white"></div>
          <div className=" h-2 w-2 rounded-full bg-white"></div>
          <div className=" h-2 w-2 rounded-full bg-white"></div>
        </div>
        <div className="flex gap-1">
          <div className=" h-2 w-2 rounded-full bg-white"></div>
          <div className=" h-2 w-2 rounded-full bg-white"></div>
          <div className=" h-2 w-2 rounded-full bg-white"></div>
          <div className=" h-2 w-2 rounded-full bg-white"></div>
        </div>
        <div className="flex gap-1">
          <div className=" h-2 w-2 rounded-full bg-white"></div>
          <div className=" h-2 w-2 rounded-full bg-white"></div>
          <div className=" h-2 w-2 rounded-full bg-white"></div>
          <div className=" h-2 w-2 rounded-full bg-white"></div>
        </div>
        <div className="flex gap-1">
          <p className="text-white">4141414</p>
        </div>
      </div>
      <div className="px-3 flex justify-between mt-6 ">
        <div>
          <p className="font-thin text-white font-sans ">CARDHOLDER</p>
          <p className="font-bold text-white">20/02/2020</p>
        </div>

        <div>
          <p className="font-thin text-white font-sans">EXPIRE</p>
          <p className="font-bold text-white">30/12/2030</p>
        </div>
      </div>
    </div>
  );
}

export default VisaCard;

// function VisaCard({ selected, details, handleSelectedCard }) {
//   const { cardHolder, cardNumber, exp, id } = details;
//   return (
//     <div
//       onClick={() => handleSelectedCard(details)}
//       className={`${
//         selected?.id === id ? " border-4 border-white" : ""
//       } relative bg-secondary-800 px-2 py-8 rounded-8 flex flex-col justify-between cursor-pointer`}
//     >
//       <div className="absolute bottom-0">
//         <img src="./img/visabg.png" alt="visabg" />
//       </div>
//       <div className="flex justify-end">
//         <img src="./img/visa.svg" alt="visacard" />
//       </div>
//       <div className="flex justify-evenly gap-2 items-center mt-6">
//         <div className="flex gap-1 items-center">
//           <div className=" h-2 w-2 rounded-full bg-white"></div>
//           <div className=" h-2 w-2 rounded-full bg-white"></div>
//           <div className=" h-2 w-2 rounded-full bg-white"></div>
//           <div className=" h-2 w-2 rounded-full bg-white"></div>
//         </div>
//         <div className="flex gap-1">
//           <div className=" h-2 w-2 rounded-full bg-white"></div>
//           <div className=" h-2 w-2 rounded-full bg-white"></div>
//           <div className=" h-2 w-2 rounded-full bg-white"></div>
//           <div className=" h-2 w-2 rounded-full bg-white"></div>
//         </div>
//         <div className="flex gap-1">
//           <div className=" h-2 w-2 rounded-full bg-white"></div>
//           <div className=" h-2 w-2 rounded-full bg-white"></div>
//           <div className=" h-2 w-2 rounded-full bg-white"></div>
//           <div className=" h-2 w-2 rounded-full bg-white"></div>
//         </div>
//         <div className="flex gap-1">
//           <p className="text-white">{cardNumber?.substring(12, 16)}</p>
//         </div>
//       </div>
//       <div className="px-3 flex justify-between mt-6 ">
//         <div>
//           <p className="font-thin text-white font-sans ">CARDHOLDER</p>
//           <p className="font-bold text-white">{cardHolder}</p>
//         </div>

//         <div>
//           <p className="font-thin text-white font-sans">EXPIRE</p>
//           <p className="font-bold text-white">{exp}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VisaCard;
