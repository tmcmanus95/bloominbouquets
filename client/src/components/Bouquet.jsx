import { bouquetsImageStylings } from "../utils/bouquetsImageStylings";
import { flowerSourceFinder } from "../utils/flowerSourceFinder";
import { wordsToStemMatching } from "../utils/wordsToStemMatching";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useMutation } from "@apollo/client";
import { DELETE_BOUQUET } from "../utils/mutations";

export default function Bouquet({
  words,
  senderUsername,
  senderId,
  toggleEdit,
  bouquetId,
  onDelete,
  isMyProfile,
}) {
  const [bouquet, setBouquet] = useState([]);
  // let bouquet;
  if (words) {
    console.log(words);
  }
  // if (!words[1]) {
  //   bouquet = words[0]?.split(",");
  // } else {
  //   bouquet = words;
  // }
  useEffect(() => {
    if (!words[1]) {
      setBouquet(words[0]?.split(","));
    } else {
      setBouquet(words);
    }

    console.log("bouquet", bouquet);
  }, [words]);
  const [deleteBouquet, error] = useMutation(DELETE_BOUQUET);
  const handleDeleteBouquet = async () => {
    console.log("I will delete bouquet");
    console.log("bouquetId", bouquetId);
    const { data } = await deleteBouquet({
      variables: { giftedWords: bouquetId },
    });
    onDelete(bouquetId);
  };
  const wordAmount = bouquet?.length;
  console.log("toggle edit is", toggleEdit);
  if (bouquet && bouquet.length == 1) {
    return (
      <div className="m-5 dark:border-white border-2">
        <Link to={`/user/${senderId}`}>
          <h1>From: {senderUsername}</h1>
        </Link>
        {isMyProfile && toggleEdit && (
          <IoIosCloseCircle
            className="text-red-500 hover:text-red-900"
            onClick={handleDeleteBouquet}
          />
        )}
        <div className=" flex flex-row justify-center">
          {bouquet?.map((word, index) => (
            <img
              key={index}
              className={`relative scale-150  ${bouquetsImageStylings(
                wordAmount,
                index
              )}`}
              src={flowerSourceFinder(word.length)}
              alt="Flower"
            ></img>
          ))}
        </div>
        <div className="flex justify-center">
          {wordAmount > 0 && (
            <img
              className="md:-mt-4 scale-125 -mt-5 z-0"
              src={wordsToStemMatching(wordAmount)}
            ></img>
          )}
        </div>
        <div>
          <h2>
            {bouquet?.map((word, index) => (
              <span key={index}>{word} </span>
            ))}
          </h2>
        </div>
      </div>
    );
  }
  if (bouquet && bouquet.length == 2) {
    return (
      <div className="m-5 dark:border-white border-2">
        <Link to={`/user/${senderId}`}>
          <h1>From: {senderUsername}</h1>
        </Link>
        {isMyProfile && toggleEdit && (
          <IoIosCloseCircle
            className="text-red-500 hover:text-red-900"
            onClick={handleDeleteBouquet}
          />
        )}
        <div className=" flex flex-row justify-center">
          {bouquet?.map((word, index) => (
            <img
              key={index}
              className={`relative scale-150  ${bouquetsImageStylings(
                wordAmount,
                index
              )}`}
              src={flowerSourceFinder(word.length)}
              alt="Flower"
            ></img>
          ))}
        </div>
        <div className="flex justify-center">
          {wordAmount > 0 && (
            <img
              className="md:-mt-4 scale-125 -mt-5 z-0"
              src={wordsToStemMatching(wordAmount)}
            ></img>
          )}
        </div>
        <div>
          <h2>
            {bouquet?.map((word, index) => (
              <span key={index}>{word} </span>
            ))}
          </h2>
        </div>
      </div>
    );
  }
  if (bouquet && bouquet.length == 3) {
    return (
      <div>
        {" "}
        <div className="m-5 dark:border-white border-2">
          <Link to={`/user/${senderId}`}>
            <h1>From: {senderUsername}</h1>
          </Link>
          {isMyProfile && toggleEdit && (
            <IoIosCloseCircle
              className="text-red-500 hover:text-red-900"
              onClick={handleDeleteBouquet}
            />
          )}
          <div className=" flex flex-row justify-center">
            {bouquet?.map((word, index) => (
              <img
                key={index}
                className={`relative  scale-150  ${bouquetsImageStylings(
                  wordAmount,
                  index
                )}`}
                src={flowerSourceFinder(word.length)}
                alt="Flower"
              ></img>
            ))}
          </div>
          <div className="flex justify-center">
            {wordAmount > 0 && (
              <img
                className="md:-mt-4 scale-125 -mt-5 z-0"
                src={wordsToStemMatching(wordAmount)}
              ></img>
            )}
          </div>
          <div>
            <h2>
              {bouquet?.map((word, index) => (
                <span key={index}>{word} </span>
              ))}
            </h2>
          </div>
        </div>
      </div>
    );
  }
  if (bouquet && bouquet.length == 4) {
    return (
      <div>
        {" "}
        <div className="m-5 dark:border-white border-2">
          <Link to={`/user/${senderId}`}>
            <h1>From: {senderUsername}</h1>
          </Link>
          {isMyProfile && toggleEdit && (
            <IoIosCloseCircle
              className="text-red-500 hover:text-red-900"
              onClick={handleDeleteBouquet}
            />
          )}
          <div className=" flex flex-row justify-center">
            {bouquet?.map((word, index) => (
              <img
                key={index}
                className={`relative hover:scale-200 scale-150  ${bouquetsImageStylings(
                  wordAmount,
                  index
                )}`}
                src={flowerSourceFinder(word.length)}
                alt="Flower"
              ></img>
            ))}
          </div>
          <div className="flex justify-center">
            {wordAmount > 0 && (
              <img
                className="md:-mt-4 scale-125 -mt-5 z-0"
                src={wordsToStemMatching(wordAmount)}
              ></img>
            )}
          </div>
          <div>
            <h2>
              {bouquet?.map((word, index) => (
                <span key={index}>{word} </span>
              ))}
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (bouquet && bouquet.length == 5) {
    return (
      <div>
        {" "}
        <div className="m-5 dark:border-white border-2">
          <Link to={`/user/${senderId}`}>
            <h1>From: {senderUsername}</h1>
          </Link>
          {isMyProfile && toggleEdit && (
            <IoIosCloseCircle
              className="text-red-500 hover:text-red-900"
              onClick={handleDeleteBouquet}
            />
          )}
          <div>
            <div className="-mb-5 flex flex-row justify-center">
              <img
                className="z-10 relative -mr-1 scale-150 "
                src={flowerSourceFinder(bouquet[0].length)}
                alt="Flower"
              ></img>
              <img
                className="z-10 relative  -ml-3  scale-150 "
                src={flowerSourceFinder(bouquet[1].length)}
                alt="Flower"
              ></img>
            </div>
            <div className="flex flex-row justify-center">
              <img
                className="relative -mr-5 scale-150 z-20 "
                src={flowerSourceFinder(bouquet[2].length)}
                alt="Flower"
              ></img>
              <img
                className="z-20 relative scale-150"
                src={flowerSourceFinder(bouquet[3].length)}
                alt="Flower"
              ></img>
              <img
                className="relative -ml-5 hover:z-20 scale-150 z-10"
                src={flowerSourceFinder(bouquet[4].length)}
              ></img>
            </div>
            <div className="flex justify-center">
              <img
                className="md:-mt-4 scale-100  -mt-4 z-0"
                src={wordsToStemMatching(wordAmount)}
              ></img>
            </div>
          </div>

          <div>
            <h2>
              {bouquet?.map((word, index) => (
                <span key={index}>{word} </span>
              ))}
            </h2>
          </div>
        </div>
      </div>
    );
  }
  if (bouquet && bouquet.length == 6) {
    return (
      <div>
        <div className="m-5 dark:border-white border-2">
          <Link to={`/user/${senderId}`}>
            <h1>From: {senderUsername}</h1>
          </Link>
          {isMyProfile && toggleEdit && (
            <IoIosCloseCircle
              className="text-red-500 hover:text-red-900"
              onClick={handleDeleteBouquet}
            />
          )}

          <div className="-mb-5 flex flex-row justify-center">
            <img
              className="relative -mr-5 scale-150 z-20 "
              src={flowerSourceFinder(bouquet[0].length)}
              alt="Flower"
            ></img>
            <img
              className="z-20 relative scale-150"
              src={flowerSourceFinder(bouquet[1].length)}
              alt="Flower"
            ></img>
            <img
              className="relative -ml-5 hover:z-20 scale-150 z-10"
              src={flowerSourceFinder(bouquet[2].length)}
            ></img>
          </div>
          <div className=" flex flex-row justify-center">
            <img
              className="relative -mr-5 scale-150 z-20 "
              src={flowerSourceFinder(bouquet[3].length)}
              alt="Flower"
            ></img>
            <img
              className="z-20 relative scale-150"
              src={flowerSourceFinder(bouquet[4].length)}
              alt="Flower"
            ></img>
            <img
              className="relative -ml-5 hover:z-20 scale-150 z-10"
              src={flowerSourceFinder(bouquet[5].length)}
            ></img>
          </div>
          <div className="flex justify-center  ">
            <img
              className="md:-mt-4 md:scale-100 -mt-4 scale-75 z-0"
              src={wordsToStemMatching(wordAmount)}
            ></img>
          </div>
          <div>
            <h2>
              {bouquet?.map((word, index) => (
                <span key={index}>{word} </span>
              ))}
            </h2>
          </div>
        </div>
      </div>
    );
  }
  if (bouquet && bouquet.length == 7) {
    return (
      <div>
        <div className="m-5 dark:border-white border-2">
          <Link to={`/user/${senderId}`}>
            <h1>From: {senderUsername}</h1>
          </Link>
          {isMyProfile && toggleEdit && (
            <IoIosCloseCircle
              className="text-red-500 hover:text-red-900"
              onClick={handleDeleteBouquet}
            />
          )}

          <div className="-mb-5 flex flex-row justify-center">
            <img
              className="relative -mr-5 scale-150 z-20 "
              src={flowerSourceFinder(bouquet[0].length)}
              alt="Flower"
            ></img>
            <img
              className="z-20 relative scale-150"
              src={flowerSourceFinder(bouquet[1].length)}
              alt="Flower"
            ></img>
            <img
              className="relative -ml-5  scale-150 z-10"
              src={flowerSourceFinder(bouquet[2].length)}
            ></img>
          </div>

          <div className="flex flex-row justify-center">
            <img
              className="z-10 -mr-5 relative   
               scale-150"
              src={flowerSourceFinder(bouquet[3].length)}
              alt="Flower"
            ></img>
            <img
              className="z-10 -mr-5 relative hover:z-10 
               scale-150"
              src={flowerSourceFinder(bouquet[4].length)}
              alt="Flower"
            ></img>
            <img
              className="z-10 -mr-5 relative hover:z-10 
               scale-150"
              src={flowerSourceFinder(bouquet[5].length)}
              alt="Flower"
            ></img>
            <img
              className="z-10 relative  hover:z-20 
               scale-150"
              src={flowerSourceFinder(bouquet[6].length)}
              alt="Flower"
            ></img>
          </div>
          <div className="flex justify-center  ">
            <img
              className="md:-mt-4 md:scale-100 -mt-4 scale-75 z-0"
              src={wordsToStemMatching(wordAmount)}
            ></img>
          </div>

          <div>
            <h2>
              {bouquet?.map((word, index) => (
                <span key={index}>{word} </span>
              ))}
            </h2>
          </div>
        </div>
      </div>
    );
  }
  if (bouquet && bouquet.length == 8) {
    return (
      <div>
        <div className="m-5 dark:border-white border-2">
          <Link to={`/user/${senderId}`}>
            <h1>From: {senderUsername}</h1>
          </Link>
          {isMyProfile && toggleEdit && (
            <IoIosCloseCircle
              className="text-red-500 hover:text-red-900"
              onClick={handleDeleteBouquet}
            />
          )}

          <div className="-mb-5 flex flex-row justify-center">
            <img
              className="z-10 -mr-5 relative   
               scale-150"
              src={flowerSourceFinder(bouquet[0].length)}
              alt="Flower"
            ></img>
            <img
              className="z-10 -mr-5 relative hover:z-10 
               scale-150"
              src={flowerSourceFinder(bouquet[1].length)}
              alt="Flower"
            ></img>
            <img
              className="z-10 -mr-5 relative hover:z-10 
               scale-150"
              src={flowerSourceFinder(bouquet[2].length)}
              alt="Flower"
            ></img>
            <img
              className="z-10 relative  hover:z-20 
               scale-150"
              src={flowerSourceFinder(bouquet[3].length)}
              alt="Flower"
            ></img>
          </div>
          <div className="flex flex-row justify-center">
            <img
              className="z-10 -mr-5 relative   
               scale-150"
              src={flowerSourceFinder(bouquet[4].length)}
              alt="Flower"
            ></img>
            <img
              className="z-10 -mr-5 relative hover:z-10 
               scale-150"
              src={flowerSourceFinder(bouquet[5].length)}
              alt="Flower"
            ></img>
            <img
              className="z-10 -mr-5 relative hover:z-10 
               scale-150"
              src={flowerSourceFinder(bouquet[6].length)}
              alt="Flower"
            ></img>
            <img
              className="z-10 relative  hover:z-20 
               scale-150"
              src={flowerSourceFinder(bouquet[7].length)}
              alt="Flower"
            ></img>
          </div>
          <div className="flex justify-center  ">
            <img
              className="md:-mt-4 md:scale-100 -mt-4 scale-75 z-0"
              src={wordsToStemMatching(wordAmount)}
            ></img>
          </div>

          <div>
            <h2>
              {bouquet?.map((word, index) => (
                <span key={index}>{word} </span>
              ))}
            </h2>
          </div>
        </div>
      </div>
    );
  }
  if (bouquet && bouquet.length == 9) {
    return (
      <div>
        <div className="m-5 dark:border-white border-2">
          <Link to={`/user/${senderId}`}>
            <h1>From: {senderUsername}</h1>
          </Link>
          {isMyProfile && toggleEdit && (
            <IoIosCloseCircle
              className="text-red-500 hover:text-red-900"
              onClick={handleDeleteBouquet}
            />
          )}

          <div className="-mb-6 flex flex-row justify-center">
            <img
              className="z-10 relative -mr-1 scale-150 "
              src={flowerSourceFinder(bouquet[0].length)}
              alt="Flower"
            ></img>
            <img
              className="z-10 relative  -ml-3  scale-150 "
              src={flowerSourceFinder(bouquet[1].length)}
              alt="Flower"
            ></img>
          </div>
          <div className="-mb-6 flex flex-row justify-center">
            <img
              className="relative -mr-5 scale-150 z-20 "
              src={flowerSourceFinder(bouquet[2].length)}
              alt="Flower"
            ></img>
            <img
              className="z-20 relative scale-150"
              src={flowerSourceFinder(bouquet[3].length)}
              alt="Flower"
            ></img>
            <img
              className="relative -ml-5  scale-150 z-10"
              src={flowerSourceFinder(bouquet[4].length)}
            ></img>
          </div>

          <div className="flex flex-row justify-center">
            <img
              className="z-10 -mr-5 relative   
               scale-150"
              src={flowerSourceFinder(bouquet[5].length)}
              alt="Flower"
            ></img>
            <img
              className="z-10 -mr-5 relative hover:z-10 
               scale-150"
              src={flowerSourceFinder(bouquet[6].length)}
              alt="Flower"
            ></img>
            <img
              className="z-10 -mr-5 relative hover:z-10 
               scale-150"
              src={flowerSourceFinder(bouquet[7].length)}
              alt="Flower"
            ></img>
            <img
              className="z-10 relative  hover:z-20 
               scale-150"
              src={flowerSourceFinder(bouquet[8].length)}
              alt="Flower"
            ></img>
          </div>
          <div className="flex justify-center  ">
            <img
              className="md:-mt-4 md:scale-100 -mt-4 scale-75 z-0"
              src={wordsToStemMatching(wordAmount)}
            ></img>
          </div>

          <div>
            <h2>
              {bouquet?.map((word, index) => (
                <span key={index}>{word} </span>
              ))}
            </h2>
          </div>
        </div>
      </div>
    );
  }
  if (bouquet && bouquet.length == 10) {
    return (
      <div>
        <div className="m-5 dark:border-white border-2">
          <Link to={`/user/${senderId}`}>
            <h1>From: {senderUsername}</h1>
          </Link>
          {isMyProfile && toggleEdit && (
            <IoIosCloseCircle
              className="text-red-500 hover:text-red-900"
              onClick={handleDeleteBouquet}
            />
          )}

          <div className="-mb-6 flex flex-row justify-center">
            <img
              className="z-10 relative -mr-1 scale-150 "
              src={flowerSourceFinder(bouquet[0].length)}
              alt="Flower"
            ></img>
            <img
              className="z-10 relative  -ml-3  scale-150 "
              src={flowerSourceFinder(bouquet[1].length)}
              alt="Flower"
            ></img>
          </div>

          <div className="-mb-6 flex flex-row justify-center">
            <img
              className="z-10 -mr-5 relative   
               scale-150"
              src={flowerSourceFinder(bouquet[2].length)}
              alt="Flower"
            ></img>
            <img
              className="z-10 -mr-5 relative hover:z-10 
               scale-150"
              src={flowerSourceFinder(bouquet[3].length)}
              alt="Flower"
            ></img>
            <img
              className="z-10 -mr-5 relative hover:z-10 
               scale-150"
              src={flowerSourceFinder(bouquet[4].length)}
              alt="Flower"
            ></img>
            <img
              className="z-10 relative  hover:z-20 
               scale-150"
              src={flowerSourceFinder(bouquet[5].length)}
              alt="Flower"
            ></img>
          </div>
          <div className="flex flex-row justify-center">
            <img
              className="z-10 -mr-5 relative   
               scale-150"
              src={flowerSourceFinder(bouquet[6].length)}
              alt="Flower"
            ></img>
            <img
              className="z-10 -mr-5 relative hover:z-10 
               scale-150"
              src={flowerSourceFinder(bouquet[7].length)}
              alt="Flower"
            ></img>
            <img
              className="z-10 -mr-5 relative hover:z-10 
               scale-150"
              src={flowerSourceFinder(bouquet[8].length)}
              alt="Flower"
            ></img>
            <img
              className="z-10 relative  hover:z-20 
               scale-150"
              src={flowerSourceFinder(bouquet[9].length)}
              alt="Flower"
            ></img>
          </div>
          <div className="flex justify-center  z-0">
            <img
              className="md:-mt-4 md:scale-100 -mt-4 scale-75 z-0"
              src={wordsToStemMatching(wordAmount)}
            ></img>
          </div>
          <div>
            <h2>
              {bouquet?.map((word, index) => (
                <span key={index}>{word} </span>
              ))}
            </h2>
          </div>
        </div>
      </div>
    );
  }
}
