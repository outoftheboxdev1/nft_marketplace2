import { Banner } from '../components';

const tos = () => (
  <div className="flex justify-center sm:px-4 p-12">
    <div className="w-full minmd:w-4/5">
      {/* <h1 className="font-poppins dark:text-white text-nft-black-1 text-4xl minlg:text-5xl font-semibold ml-4 xs:ml-0">What is an NFT?</h1> */}
      <Banner
        name={(<>Terms Of Service</>)}
        childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
        parentStyle="justify-start mb-7 h-32 sm:h-14 p-12 xs:p-4 xs:h-17 rounded-3xl"
      />
      <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-normal sm:text-small mt-4 ml-5 xs:ml-3 xs:mr-1">
        Effective Date: 09/13/2023<br /><br />

        Welcome to EverTraded.com (&quot;the Platform&quot;). By accessing or using the Platform, you agree to be bound by these Terms of Service (&quot;Terms&quot;). Please read them carefully before using the Platform.<br /><br />

        <span className="font-bold">1. Acceptance of Terms</span><br /><br />

        These Terms, along with our Privacy Policy, govern your use of the Platform. If you do not agree with any part of these Terms, you may not access or use the Platform.<br /><br />

        <span className="font-bold">2. Registration and Accounts</span><br /><br />

        a. To access certain features of the Platform, you may be required to create an account. You agree to provide accurate and up-to-date information during the registration process.<br /><br />

        b. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.<br /><br />

        <span className="font-bold">3. User Conduct</span><br /><br />

        a. You agree to use the Platform in compliance with all applicable laws and regulations.<br /><br />

        b. You shall not engage in any activity that disrupts or interferes with the operation of the Platform.<br /><br />

        c. You shall not attempt to gain unauthorized access to any part of the Platform.<br /><br />

        <span className="font-bold">4. Intellectual Property</span><br /><br />

        a. All content on the Platform, including but not limited to text, graphics, logos, and software, is protected by intellectual property rights owned by EverTraded.com or its licensors.<br /><br />

        b. You agree not to reproduce, distribute, or create derivative works from any content without explicit permission.<br /><br />

        <span className="font-bold">5. NFT Transactions</span><br /><br />

        a. The Platform facilitates the trading of NFTs. EverTraded.com is not a party to any transaction and does not own or guarantee the authenticity of any NFT.<br /><br />

        b. Users are solely responsible for verifying the authenticity and ownership rights of any NFT before making a transaction.<br /><br />

        <span className="font-bold">6. Prohibited Activities</span><br /><br />

        a. You may not engage in any activity that violates these Terms or any applicable laws.<br /><br />

        b. Prohibited activities include but are not limited to fraud, harassment, spamming, and distributing malicious software.<br /><br />

        <span className="font-bold">7. Termination</span><br /><br />

        EverTraded.com reserves the right to terminate or suspend your account for any reason, including violation of these Terms.<br /><br />

        <span className="font-bold">8. Limitation of Liability</span><br /><br />

        a. The Platform is provided on an &quot;as is&quot; and &quot;as available&quot; basis. EverTraded.com makes no warranties or representations about the accuracy or completeness of the content.<br /><br />

        b. In no event shall EverTraded.com be liable for any indirect, consequential, or incidental damages.<br /><br />

        <span className="font-bold">9. Governing Law</span><br /><br />

        These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction].<br /><br />

        <span className="font-bold">10. Changes to Terms</span><br /><br />

        EverTraded.com reserves the right to modify or update these Terms at any time without prior notice.
      </p>
    </div>
  </div>

);
export default tos;
