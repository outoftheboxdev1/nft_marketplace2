import React, { useState } from 'react';
import styles from './FAQ.module.css';
import { Banner } from '../components';

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index) => {
    if (openItem === index) {
      setOpenItem(null);
    } else {
      setOpenItem(index);
    }
  };

  const faqItems = [
    {
      question: 'What is an NFT?',
      answer: 'An NFT, or Non-Fungible Token, is a unique digital asset that represents ownership of a specific item or piece of content, typically stored on a blockchain. When you mint an NFT on evertraded.com it will be on the Etherium mainnet.',
    },
    {
      question: 'What network does your platform use?',
      answer: 'We use the Etherium mainnet. When you mint an NFT on evertraded.com it will be on the Etherium mainnet as an ARTBYTE.',
    },
    {
      question: 'How do I buy NFTs on your platform?',
      answer: 'To buy NFTs on our platform, you need to connect a compatible wallet (metamask), and browse the marketplace. Once you find an NFT you like, you can make a purchase.',
    },
    {
      question: 'What cryptocurrencies are accepted for payments?',
      answer: 'Currently, we accept Ethereum (ETH) for payments. We may add support for other cryptocurrencies in the future.',
    },
    {
      question: 'How can I sell my NFTs on your platform?',
      answer: 'To sell NFTs, you need to connect your wallet, and list your NFTs for sale in the marketplace by clicking the "Create" Button. You can give your NFT a name, a description, and finally set a price for your NFT. Once everything looks good you can create it and it will be listed on our marketplace.',
    },
    {
      question: 'How do I see NFTs I listed?',
      answer: 'You can see NFTs you listed by clicking "Listed NFTs" in the navbar.',
    },
    {
      question: 'How do I see NFTs I bought?',
      answer: 'You can see NFTs you bought by clicking "My NFTs" in the navbar.',
    },
    {
      question: 'How do I edit my profile?',
      answer: 'To edit your profile go to my NFTs and then click edit profile. You can upload a profile image and set a username and bio.',
    },
    // Add more FAQ items as needed.
  ];

  return (
    <div className={`${styles.faqPage} mt-14 pl-10 pr-10 minlg:pl-80 minlg:pr-80`}>
      {/* <h1 className="pl-10 pr-10 minlg:pl-80 minlg:pr-80 mb-5 text-4xl font-poppins uppercase font-bold underline">Frequently Asked Questions</h1> */}
      <Banner
        name={(<>Frequently Asked Questions</>)}
        childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
        parentStyle="justify-start mb-7 h-32 sm:h-14 p-12 xs:p-4 xs:h-17 rounded-3xl "
      />
      <ul className={`${styles.faqList} ml-4`}>
        {faqItems.map((item, index) => (
          <li key={index} className={`${styles.faqItem} ${openItem === index ? styles.faqOpen : ''}`}>
            <h3 className={`${styles.faqQuestion} font-poppins`} onClick={() => toggleItem(index)}>{item.question}</h3>
            <p className={`${styles.faqAnswer} font-poppins`}>{item.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
