import './style.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [memeKey, setMemeKey] = useState('');
  const [randomImg, setRandomImg] = useState(
    'https://api.memegen.link/images/aag.png',
  );
  const [allMemeImgs, setAllMemeImgs] = useState([]);

  function filterString(firstText) {
    const underscoreText = firstText.replace(/_/g, '__');
    const doubleSpaceText = underscoreText.replace(/ +/g, '_');
    const spaceText = doubleSpaceText.replace(/ /g, '_');
    const dashText = spaceText.replace(/-/g, '--');
    const questText = dashText.replace(/\?/g, '~q');
    const ampersandText = questText.replace(/&/g, '~a');
    const hashText = ampersandText.replace(/#/g, '~h');
    const percentText = hashText.replace(/%/g, '~p');
    const cleanText = percentText.replace('/', '~s');

    return cleanText;
  }

  const memeUrl = `https://api.memegen.link/images/${memeKey}/${filterString(
    topText,
  )}/${filterString(bottomText)}.png`;

  useEffect(() => {
    fetch('https://api.memegen.link/templates/')
      .then((response) => response.json())
      .then((response) => {
        setAllMemeImgs(response);
      });
  }, []);

  function getNewMeme(e) {
    e.preventDefault();

    const randNum = Math.floor(Math.random() * allMemeImgs.length);
    const randMemeImgObj = allMemeImgs[randNum];
    const randMemeImgUrl = randMemeImgObj.blank;
    const randMemeImgKey = randMemeImgObj.key;

    setRandomImg(randMemeImgUrl);
    setMemeKey(randMemeImgKey);
  }
  return (
    <div>
      <form className="meme-form">
        <input
          name="topText"
          placeholder="Top Text"
          value={topText}
          onChange={(e) => {
            setTopText(e.currentTarget.value);
          }}
        />
        <input
          name="bottomText"
          placeholder="Bottom Text"
          value={bottomText}
          onChange={(e) => {
            setBottomText(e.currentTarget.value);
          }}
        />
        <button
          className="newMemeBtn"
          onClick={(e) => {
            getNewMeme(e);
          }}
        >
          Random photo
        </button>
      </form>
      <div className="meme">
        <img src={randomImg} alt="Meme" width="auto" height="auto" />
        <h2 className="top">{topText}</h2>
        <h2 className="bottom">{bottomText}</h2>
      </div>
    </div>
  );
}

export default MemeGenerator;
