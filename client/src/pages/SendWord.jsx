import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { SEND_WORD } from "../utils/mutations";
import { QUERY_MY_WORDS_AND_MY_FRIENDS } from "../utils/queries";
import FlowerSprite from "../components/FlowerSprite";
export default function SendWord() {
  const { data, loading } = useQuery(QUERY_MY_WORDS_AND_MY_FRIENDS);
  const [sendWord, error] = useMutation(SEND_WORD);
  const [friends, setFriends] = useState([]);
  const [searchUsername, setSearchUsername] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [recipientUsername, setRecipientUsername] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [words, setWords] = useState([]);
  const [wordsToSend, setWordsToSend] = useState([]);
  const handleSendWord = async (wordsToSend) => {
    let userId = data.me._id;
    console.log(
      `userId: ${userId} | recipientId: ${recipientId} | ${wordsToSend}`
    );
    const stringWordsToSend = wordsToSend.join(",");
    try {
      const { data } = await sendWord({
        variables: {
          giftedWords: stringWordsToSend,
          userId: userId,
          recipientId: recipientId,
        },
      });
      console.log("data", data);
    } catch (error) {
      console.log("Could not send word");
    }
  };

  const handleSetRecpientId = (recipient) => {
    setRecipientId(recipient._id);
    setRecipientUsername(recipient.username);
    setSelectedRecipient(true);
  };
  const addWordToSend = (word) => {
    setWordsToSend([...wordsToSend, word]);
    setWords(data.me.words);
    setSearchTerm("");
  };
  const handleWordInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleFriendInputChange = (e) => {
    setSearchUsername(e.target.value);
  };

  useEffect(() => {
    if (data) {
      if (data.me.friends.length > 0) {
        setFriends(data.me.friends);
        console.log("friends", friends);
      }
      if (data.me.words.length > 0) {
        setWords(data.me.words);
      }
    }
  }, [data]);
  const filteredFriends = friends.filter((friend) =>
    friend.username.toLowerCase().includes(searchUsername.toLowerCase())
  );
  console.log("filteredFriends,", filteredFriends);
  const filteredWords = words.filter((word) =>
    word.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("words", words);
  console.log("friends", friends);
  return (
    <div className="dark:bg-slate-700 dark:text-white">
      <h1>Send a Bouquet</h1>
      <div className="flex flex-row">
        {wordsToSend.map((word, index) => (
          <div key={index} className="flex flex-row">
            <h1>{word}</h1>
            <FlowerSprite wordLength={word.length} />
          </div>
        ))}
      </div>
      <div className="items-center">
        <h1>Select Words to Send</h1>
        <input
          className="text-black text-xl md:text-3xl mx-2 md:mx-5 border-2 border-gray-400 pt-2 px-4 rounded"
          type="text"
          placeholder="Search for a word..."
          value={searchTerm}
          onChange={handleWordInputChange}
        />

        {searchTerm && (
          <div>
            <ul className="absolute mt-1 bg-white border border-gray-300 rounded z-10 left-1/2 transform -translate-x-1/2 w-full md:w-80">
              {filteredWords &&
                filteredWords.map((word) => (
                  <li
                    key={word}
                    onClick={() => addWordToSend(word)}
                    className={`cursor-pointer text-black px-4 hover:bg-blue-300 hover:text-black`}
                  >
                    {word}
                  </li>
                ))}
            </ul>
          </div>
        )}
        {selectedRecipient ? (
          <div>
            <h1>Sending a bouquet to: </h1>
            <h1>{recipientUsername}</h1>
            <button
              onClick={() => handleSendWord(wordsToSend)}
              className="bg-blue-500 hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        ) : (
          <div>
            <h1>Select a person to send a bouquet to</h1>
          </div>
        )}
        <input
          className="text-black text-xl md:text-3xl mx-2 md:mx-5 border-2 border-gray-400 pt-2 px-4 rounded"
          type="text"
          placeholder="Search for a friend..."
          value={searchUsername}
          onChange={handleFriendInputChange}
        />

        {searchUsername && (
          <ul className="absolute mt-1 bg-white border border-gray-300 rounded z-10 left-1/2 transform -translate-x-1/2 w-full md:w-80">
            {filteredFriends &&
              filteredFriends.map((friend) => (
                <li
                  key={friend._id}
                  onClick={() => handleSetRecpientId(friend)}
                  className={`cursor-pointer text-black px-4 hover:bg-blue-300 hover:text-black`}
                >
                  {friend.username}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
