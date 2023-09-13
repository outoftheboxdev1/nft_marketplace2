import Image from 'next/image';
import { Banner } from '../components';
import images from '../assets';

const howItWorks = () => (
  <div className="flex justify-center sm:px-4 p-12">
    <div className="w-full minmd:w-4/5">
      {/* <h1 className="font-poppins dark:text-white text-nft-black-1 text-4xl minlg:text-5xl font-semibold ml-4 xs:ml-0">What is an NFT?</h1> */}
      <Banner
        name={(<>What is an NFT?</>)}
        childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
        parentStyle="justify-start mb-7 h-32 sm:h-14 p-12 xs:p-4 xs:h-17 rounded-3xl"
      />
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-normal sm:text-small mt-4 ml-5 xs:ml-3 xs:mr-1">An NFT, or Non-Fungible Token, is a digital asset that represents ownership or proof of authenticity of a unique item or piece of content, typically stored on a blockchain, which is a decentralized digital ledger.
        Unlike cryptocurrencies like Bitcoin or Ethereum, which are fungible and can be exchanged on a one-to-one basis (1 BTC = 1 BTC), NFTs are non-fungible, meaning each token has distinct properties and cannot be exchanged on a like-for-like basis with another NFT.
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-normal sm:text-small mt-4 ml-5 xs:ml-3 xs:mr-1">NFTs provide a new way to represent ownership and authenticity in the digital world, enabling creators to monetize their work and collectors to own and trade unique digital assets. Their use cases continue to expand as more industries and creators explore the possibilities of NFT technology.
      </p>
      <div className="flex justify-center sm:px-4 p-4">
        <Image
          src={images.nftBunny}
          alt="Cool Bunny NFT"
          className="rounded-3xl"
          width={0}
          height={0}

        />
      </div>
      <Banner
        name={(<>How NFTs Work</>)}
        childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
        parentStyle="justify-start mb-7 h-32 sm:h-14 p-12 xs:p-4 xs:h-17 rounded-3xl mt-7"
      />
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-normal sm:text-small mt-4 ml-5 xs:ml-3 xs:mr-1">
        NFTs operate through blockchain technology, which functions as an extensive, digital, publicly accessible ledger. The most widely used blockchains are decentralized, meaning they are distributed across numerous nodes (essentially people&apos;s computers).
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-normal sm:text-small mt-4 ml-5 xs:ml-3 xs:mr-1">
        In contrast to a centralized server controlled by a single company, blockchain relies on a peer-to-peer network. This not only guarantees the immutability of the blockchain but also enables node operators to earn rewards collectively, rather than benefiting a sole corporation. Because the blockchain meticulously documents and retains transaction history, it possesses a distinctive capacity to establish verifiable authenticity and digital ownership.
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-normal sm:text-small mt-4 ml-5 xs:ml-3 xs:mr-1 mb-5">
        Every action involving an NFT, whether it involves creation, transfer, purchase, sale, or any other interaction, is meticulously recorded on the blockchain. This recording is what underpins authentication.
      </p>
      <div className="flex justify-center sm:px-4 p-4">
        <Image
          src={images.banner01}
          alt="banner"
          className="rounded-3xl"
          width={0}
          height={0}
        />
      </div>
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-normal sm:text-small mt-4 ml-5 xs:ml-3 xs:mr-1">
        This ledger serves as an enduring declaration of authenticity, accessible to anyone. Currently, when acquiring a piece of art or a collectible, it often comes with a paper certificate of authenticity that one must safeguard indefinitely, making it vulnerable to loss or damage and creating a fragile system for verifying authenticity. Blockchains offer a straightforward and more secure resolution to this longstanding challenge of confirming authenticity.
      </p>

      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-normal sm:text-small mt-4 ml-5 xs:ml-3 xs:mr-1">
        Imagine you wish to purchase a work of art by Tyler Hobbs. With NFTs, you can review the complete history of that artwork, including its previous owners, each transaction, all the way back to Hobbs&apos; initial creation of the artwork. Without NFTs, determining whether you are acquiring the genuine piece or an exceptionally convincing replica would be much more challenging.
      </p>
      <Banner
        name={(<>Art NFTs</>)}
        childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
        parentStyle="justify-start mb-7 h-32 sm:h-14 p-12 xs:p-4 xs:h-17 rounded-3xl mt-7"
      />
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-normal sm:text-small mt-4 ml-5 xs:ml-3 xs:mr-1">
        An art NFT is a specific type of non-fungible token designed to represent digital artworks, including drawings, paintings, and other digital creations. Each art NFT possesses inherent uniqueness and an identifiable link to its original creator, which can add significant value.
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-normal sm:text-small mt-4 ml-5 xs:ml-3 xs:mr-1">
        These art NFTs usher in a novel era of digital art that can be collected and traded, mirroring the dynamics of traditional physical artwork markets. Moreover, art NFTs often offer additional functionalities, such as granting commercial usage rights to the underlying artwork.
      </p>
      <div className="flex justify-center sm:px-4 p-4">
        <Image
          src={images.banner02}
          alt="banner"
          className="rounded-3xl"
          width={0}
          height={0}
        />
      </div>
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-normal sm:text-small mt-4 ml-5 xs:ml-3 xs:mr-1">
        Artists are leveraging NFTs to craft remarkable and innovative works. For instance, Damien Hirst incorporated NFTs into his &quot;The Currency&quot; collection, where he generated digital renditions of 10,000 distinct physical paintings. Collectors were granted a one-year window to choose between the digital and physical versions of the artwork, with the unpicked variant slated for deletion.
      </p>
      <Banner
        name={(<>How are NFTs bought and sold? </>)}
        childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
        parentStyle="justify-start mb-7 h-32 sm:h-14 p-12 xs:p-4 xs:h-17 rounded-3xl mt-7"
      />
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-normal sm:text-small mt-4 ml-5 xs:ml-3 xs:mr-1">
        As NFTs become more popular, many online places have popped up where you can buy and sell them. These places are called marketplaces, and they each have their own unique features. Some only work with one type of technology (blockchain), some are very exclusive and selective, and some are known for specific types of NFTs.
      </p>
      <div className="flex justify-center sm:px-4 p-4">
        <Image
          src={images.banner03}
          alt="banner"
          className="rounded-3xl"
          width={0}
          height={0}
        />
      </div>
      <p className="font-poppins dark:text-white text-nft-black-1 font-bold text-3xl sm:text-lg mt-4 ml-5 xs:ml-3 xs:mr-1">
        How to Safely Assess an NFT Before Purchasing:
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-normal sm:text-small mt-4 ml-5 xs:ml-3 xs:mr-1">
        Web3 technology is still relatively new and continually changing. While there&apos;s no foolproof way to ensure complete safety, there are some good practices to follow. The general rule is that if something seems too good to be true, it probably is. Here are a few steps to consider:
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-normal sm:text-small mt-4 ml-5 xs:ml-3 xs:mr-1">
        <span className="font-bold">Never Share Your Wallet&apos;s Seed Phrase:</span> Don&apos;t ever share your wallet&apos;s seed phrase with anyone. It&apos;s like the key to your digital assets, and giving it away could lead to loss.
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-normal sm:text-small mt-4 ml-5 xs:ml-3 xs:mr-1">
        <span className="font-bold">Exercise Caution with Wallet Actions:</span> Be careful when using your wallet for transactions. Double-check everything before confirming, as mistakes can be costly.
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-normal sm:text-small mt-4 ml-5 xs:ml-3 xs:mr-1">
        <span className="font-bold">Thoroughly Evaluate NFTs:</span> Take your time to evaluate NFTs before making a purchase. Look into the details, history, and authenticity.
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-normal sm:text-small mt-4 ml-5 xs:ml-3 xs:mr-1">
        <span className="font-bold">Do Your Research:</span> it&apos;s crucial to conduct your research and exercise your judgment before buying any NFT
      </p>
    </div>
  </div>

);
export default howItWorks;
