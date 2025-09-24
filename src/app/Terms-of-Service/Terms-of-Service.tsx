"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiFileText, FiShield, FiUser, FiGlobe, FiCreditCard, FiMail, FiChevronDown, FiChevronUp, FiCalendar, FiInfo, FiLock, FiAlertTriangle } from 'react-icons/fi';

const TermsOfService = () => {
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    introduction: true,
    accounts: false,
    access: false,
    userContent: false,
    indemnification: false,
    thirdParty: false,
    disclaimers: false,
    liability: false,
    termination: false,
    copyright: false,
    general: false,
    disputeResolution: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    {
      id: 'introduction',
      icon: <FiFileText className="text-blue-500" />,
      title: 'Introduction',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FiCalendar className="text-blue-500" />
            <span className="text-blue-500 font-medium">Version 1.0 | Last Revised: September 16, 2025</span>
          </div>
          <p>
            The website located at www.fielduo.com (the "Site") is a copyrighted work belonging to Fielduo, Inc ("Company", "us", "our", and "we"). Certain features of the Site may be subject to additional guidelines, terms, or rules, which will be posted on the Site in connection with such features. All such additional terms, guidelines, and rules are incorporated by reference into these Terms.
          </p>
          <p>
            THESE TERMS OF USE (THESE "TERMS") SET FORTH THE LEGALLY BINDING TERMS AND CONDITIONS THAT GOVERN YOUR USE OF THE SITE. BY ACCESSING OR USING THE SITE, YOU ARE ACCEPTING THESE TERMS (ON BEHALF OF YOURSELF OR THE ENTITY THAT YOU REPRESENT), AND YOU REPRESENT AND WARRANT THAT YOU HAVE THE RIGHT, AUTHORITY, AND CAPACITY TO ENTER INTO THESE TERMS (ON BEHALF OF YOURSELF OR THE ENTITY THAT YOU REPRESENT).
          </p>
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-4 mt-4">
            <div className="flex items-start gap-3">
              <FiAlertTriangle className="text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-500 mb-1">IMPORTANT: DISPUTE RESOLUTION</h3>
                <p>
                  PLEASE BE AWARE THAT SECTION 10.2 CONTAINS PROVISIONS GOVERNING HOW TO RESOLVE DISPUTES BETWEEN YOU AND COMPANY. AMONG OTHER THINGS, SECTION 10.2 INCLUDES AN AGREEMENT TO ARBITRATE WHICH REQUIRES, WITH LIMITED EXCEPTIONS, THAT ALL DISPUTES BETWEEN YOU AND US SHALL BE RESOLVED BY BINDING AND FINAL ARBITRATION. SECTION 10.2 ALSO CONTAINS A CLASS ACTION AND JURY TRIAL WAIVER. PLEASE READ SECTION 10.2 CAREFULLY.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'accounts',
      icon: <FiUser className="text-blue-500" />,
      title: 'Accounts',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-3">1.1. Account Creation</h3>
            <p className="mb-4">
              In order to use certain features of the Site, you must register for an account ("Account") and provide certain information about yourself as prompted by the account registration form. You represent and warrant that: (a) all required registration information you submit is truthful and accurate; (b) you will maintain the accuracy of such information. You may delete your Account at any time, for any reason, by following the instructions on the Site. Company may suspend or terminate your Account in accordance with Section 8.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">1.2. Account Responsibilities</h3>
            <p>
              You are responsible for maintaining the confidentiality of your Account login information and are fully responsible for all activities that occur under your Account. You agree to immediately notify Company of any unauthorized use, or suspected unauthorized use of your Account or any other breach of security. Company cannot and will not be liable for any loss or damage arising from your failure to comply with the above requirements.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'access',
      icon: <FiGlobe className="text-blue-500" />,
      title: 'Access to the Site',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-3">2.1. License</h3>
            <p className="mb-4">
              Subject to these Terms, Company grants you a non-transferable, non-exclusive, revocable, limited license to use and access the Site solely for your own personal, noncommercial use.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">2.2. Certain Restrictions</h3>
            <p className="mb-4">
              The rights granted to you in these Terms are subject to the following restrictions: (a) you shall not license, sell, rent, lease, transfer, assign, distribute, host, or otherwise commercially exploit the Site, whether in whole or in part, or any content displayed on the Site; (b) you shall not modify, make derivative works of, disassemble, reverse compile or reverse engineer any part of the Site; (c) you shall not access the Site in order to build a similar or competitive website, product, or service; and (d) except as expressly stated herein, no part of the Site may be copied, reproduced, distributed, republished, downloaded, displayed, posted or transmitted in any form or by any means.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">2.3. Modification</h3>
            <p className="mb-4">
              Company reserves the right, at any time, to modify, suspend, or discontinue the Site (in whole or in part) with or without notice to you. You agree that Company will not be liable to you or to any third party for any modification, suspension, or discontinuation of the Site or any part thereof.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">2.4. No Support or Maintenance</h3>
            <p className="mb-4">
              You acknowledge and agree that Company will have no obligation to provide you with any support or maintenance in connection with the Site.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">2.5. Ownership</h3>
            <p className="mb-4">
              Excluding any User Content that you may provide (defined below), you acknowledge that all the intellectual property rights, including copyrights, patents, trade marks, and trade secrets, in the Site and its content are owned by Company or Company's suppliers. Neither these Terms (nor your access to the Site) transfers to you or any third party any rights, title or interest in or to such intellectual property rights, except for the limited access rights expressly set forth in Section 2.1. Company and its suppliers reserve all rights not granted in these Terms. There are no implied licenses granted under these Terms.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">2.6. Feedback</h3>
            <p>
              If you provide Company with any feedback or suggestions regarding the Site ("Feedback"), you hereby assign to Company all rights in such Feedback and agree that Company shall have the right to use and fully exploit such Feedback and related information in any manner it deems appropriate. Company will treat any Feedback you provide to Company as non-confidential and non-proprietary. You agree that you will not submit to Company any information or ideas that you consider to be confidential or proprietary.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'userContent',
      icon: <FiUser className="text-blue-500" />,
      title: 'User Content',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-3">3.1. User Content</h3>
            <p className="mb-4">
              "User Content" means any and all information and content that a user submits to, or uses with, the Site (e.g., content in the user's profile or postings). You are solely responsible for your User Content. You assume all risks associated with use of your User Content, including any reliance on its accuracy, completeness or usefulness by others, or any disclosure of your User Content that personally identifies you or any third party. You hereby represent and warrant that your User Content does not violate our Acceptable Use Policy (defined in Section 3.3). You may not represent or imply to others that your User Content is in any way provided, sponsored or endorsed by Company. Since you alone are responsible for your User Content, you may expose yourself to liability if, for example, your User Content violates the Acceptable Use Policy. Company is not obligated to backup any User Content, and your User Content may be deleted at any time without prior notice. You are solely responsible for creating and maintaining your own backup copies of your User Content if you desire.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">3.2. License</h3>
            <p className="mb-4">
              You hereby grant (and you represent and warrant that you have the right to grant) to Company an irrevocable, nonexclusive, royalty-free and fully paid, worldwide license to reproduce, distribute, publicly display and perform, prepare derivative works of, incorporate into other works, and otherwise use and exploit your User Content, and to grant sublicenses of the foregoing rights, solely for the purposes of including your User Content in the Site. You hereby irrevocably waive (and agree to cause to be waived) any claims and assertions of moral rights or attribution with respect to your User Content.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">3.3. Acceptable Use Policy</h3>
            <p className="mb-4">
              The following terms constitute our "Acceptable Use Policy":
            </p>
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4 mb-4">
              <p className="mb-3">
                (a) You agree not to use the Site to collect, upload, transmit, display, or distribute any User Content (i) that violates any third-party right, including any copyright, trademark, patent, trade secret, moral right, privacy right, right of publicity, or any other intellectual property or proprietary right, (ii) that is unlawful, harassing, abusive, tortious, threatening, harmful, invasive of another's privacy, vulgar, defamatory, false, intentionally misleading, trade libelous, pornographic, obscene, patently offensive, promotes racism, bigotry, hatred, or physical harm of any kind against any group or individual or is otherwise objectionable, (iii) that is harmful to minors in any way, or (iv) that is in violation of any law, regulation, or obligations or restrictions imposed by any third party.
              </p>
              <p>
                (b) In addition, you agree not to: (i) upload, transmit, or distribute to or through the Site any computer viruses, worms, or any software intended to damage or alter a computer system or data; (ii) send through the Site unsolicited or unauthorized advertising, promotional materials, junk mail, spam, chain letters, pyramid schemes, or any other form of duplicative or unsolicited messages, whether commercial or otherwise; (iii) use the Site to harvest, collect, gather or assemble information or data regarding other users, including e-mail addresses, without their consent; (iv) interfere with, disrupt, or create an undue burden on servers or networks connected to the Site, or violate the regulations, policies or procedures of such networks; (v) attempt to gain unauthorized access to the Site (or to other computer systems or networks connected to or used together with the Site), whether through password mining or any other means; (vi) harass or interfere with any other user's use and enjoyment of the Site; or (vii) use software or automated agents or scripts to produce multiple accounts on the Site, or to generate automated searches, requests, or queries to (or to strip, scrape, or mine data from) the Site.
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">3.4. Enforcement</h3>
            <p>
              We reserve the right (but have no obligation) to review, refuse and/or remove any User Content in our sole discretion, and to investigate and/or take appropriate action against you in our sole discretion if you violate the Acceptable Use Policy or any other provision of these Terms or otherwise create liability for us or any other person. Such action may include removing or modifying your User Content, terminating your Account in accordance with Section 8, and/or reporting you to law enforcement authorities.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'indemnification',
      icon: <FiShield className="text-blue-500" />,
      title: 'Indemnification',
      content: (
        <div>
          <p>
            You agree to indemnify and hold Company (and its officers, employees, and agents) harmless, including costs and attorneys' fees, from any claim or demand made by any third party due to or arising out of (a) your use of the Site, (b) your violation of these Terms, (c) your violation of applicable laws or regulations or (d) your User Content. Company reserves the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate with our defense of these claims. You agree not to settle any matter without the prior written consent of Company. Company will use reasonable efforts to notify you of any such claim, action or proceeding upon becoming aware of it.
          </p>
        </div>
      )
    },
    {
      id: 'thirdParty',
      icon: <FiGlobe className="text-blue-500" />,
      title: 'Third-Party Links & Ads; Other Users',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-3">5.1. Third-Party Links & Ads</h3>
            <p className="mb-4">
              The Site may contain links to third-party websites and services, and/or display advertisements for third parties (collectively, "Third-Party Links & Ads"). Such Third-Party Links & Ads are not under the control of Company, and Company is not responsible for any Third-Party Links & Ads. Company provides access to these Third-Party Links & Ads only as a convenience to you, and does not review, approve, monitor, endorse, warrant, or make any representations with respect to Third-Party Links & Ads. You use all Third-Party Links & Ads at your own risk, and should apply a suitable level of caution and discretion in doing so. When you click on any of the Third-Party Links & Ads, the applicable third party's terms and policies apply, including the third party's privacy and data gathering practices. You should make whatever investigation you feel necessary or appropriate before proceeding with any transaction in connection with such Third-Party Links & Ads.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">5.2. Other Users</h3>
            <p className="mb-4">
              Each Site user is solely responsible for any and all of its own User Content. Since we do not control User Content, you acknowledge and agree that we are not responsible for any User Content, whether provided by you or by others. We make no guarantees regarding the accuracy, currency, suitability, appropriateness, or quality of any User Content. Your interactions with other Site users are solely between you and such users. You agree that Company will not be responsible for any loss or damage incurred as the result of any such interactions. If there is a dispute between you and any Site user, we are under no obligation to become involved.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">5.3. Release</h3>
            <p>
              You hereby release and forever discharge Company (and our officers, employees, agents, successors, and assigns) from, and hereby waive and relinquish, each and every past, present and future dispute, claim, controversy, demand, right, obligation, liability, action and cause of action of every kind and nature (including personal injuries, death, and property damage), that has arisen or arises directly or indirectly out of, or that relates directly or indirectly to, the Site (including any interactions with, or act or omission of, other Site users or any Third-Party Links & Ads). IF YOU ARE A CALIFORNIA RESIDENT, YOU HEREBY WAIVE CALIFORNIA CIVIL CODE SECTION 1542 IN CONNECTION WITH THE FOREGOING, WHICH STATES: "A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS WHICH THE CREDITOR OR RELEASING PARTY DOES NOT KNOW OR SUSPECT TO EXIST IN HIS OR HER FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH IF KNOWN BY HIM OR HER MUST HAVE MATERIALLY AFFECTED HIS OR HER SETTLEMENT WITH THE DEBTOR OR RELEASED PARTY."
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'disclaimers',
      icon: <FiAlertTriangle className="text-blue-500" />,
      title: 'Disclaimers',
      content: (
        <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-5">
          <p className="font-bold text-blue-500 mb-3">IMPORTANT DISCLAIMER</p>
          <p>
            THE SITE IS PROVIDED ON AN "AS-IS" AND "AS AVAILABLE" BASIS, AND COMPANY (AND OUR SUPPLIERS) EXPRESSLY DISCLAIM ANY AND ALL WARRANTIES AND CONDITIONS OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING ALL WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, QUIET ENJOYMENT, ACCURACY, OR NON-INFRINGEMENT. WE (AND OUR SUPPLIERS) MAKE NO WARRANTY THAT THE SITE WILL MEET YOUR REQUIREMENTS, WILL BE AVAILABLE ON AN UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE BASIS, OR WILL BE ACCURATE, RELIABLE, FREE OF VIRUSES OR OTHER HARMFUL CODE, COMPLETE, LEGAL, OR SAFE. IF APPLICABLE LAW REQUIRES ANY WARRANTIES WITH RESPECT TO THE SITE, ALL SUCH WARRANTIES ARE LIMITED IN DURATION TO 90 DAYS FROM THE DATE OF FIRST USE.
          </p>
          <p className="mt-3">
            SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE EXCLUSION MAY NOT APPLY TO YOU. SOME JURISDICTIONS DO NOT ALLOW LIMITATIONS ON HOW LONG AN IMPLIED WARRANTY LASTS, SO THE ABOVE LIMITATION MAY NOT APPLY TO YOU.
          </p>
        </div>
      )
    },
    {
      id: 'liability',
      icon: <FiAlertTriangle className="text-blue-500" />,
      title: 'Limitation on Liability',
      content: (
        <div className="space-y-4">
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL COMPANY (OR OUR SUPPLIERS) BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY LOST PROFITS, LOST DATA, COSTS OF PROCUREMENT OF SUBSTITUTE PRODUCTS, OR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES ARISING FROM OR RELATING TO THESE TERMS OR YOUR USE OF, OR INABILITY TO USE, THE SITE, EVEN IF COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. ACCESS TO, AND USE OF, THE SITE IS AT YOUR OWN DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR DEVICE OR COMPUTER SYSTEM, OR LOSS OF DATA RESULTING THEREFROM.
          </p>
          <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
            <p className="font-bold text-blue-500 mb-2">LIABILITY CAP</p>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY DAMAGES ARISING FROM OR RELATED TO THESE TERMS (FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION), WILL AT ALL TIMES BE LIMITED TO A MAXIMUM OF FIFTY US DOLLARS. THE EXISTENCE OF MORE THAN ONE CLAIM WILL NOT ENLARGE THIS LIMIT. YOU AGREE THAT OUR SUPPLIERS WILL HAVE NO LIABILITY OF ANY KIND ARISING FROM OR RELATING TO THESE TERMS.
            </p>
          </div>
          <p>
            SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.
          </p>
        </div>
      )
    },
    {
      id: 'termination',
      icon: <FiUser className="text-blue-500" />,
      title: 'Term and Termination',
      content: (
        <div>
          <p className="mb-4">
            Subject to this Section, these Terms will remain in full force and effect while you use the Site. We may suspend or terminate your rights to use the Site (including your Account) at any time for any reason at our sole discretion, including for any use of the Site in violation of these Terms.
          </p>
          <p className="mb-4">
            Upon termination of your rights under these Terms, your Account and right to access and use the Site will terminate immediately. You understand that any termination of your Account may involve deletion of your User Content associated with your Account from our live databases. Company will not have any liability whatsoever to you for any termination of your rights under these Terms, including for termination of your Account or deletion of your User Content.
          </p>
          <p>
            Even after your rights under these Terms are terminated, the following provisions of these Terms will remain in effect: Sections 2.2 through 2.6, Section 3 and Sections 4 through 10.
          </p>
        </div>
      )
    },
    {
      id: 'copyright',
      icon: <FiFileText className="text-blue-500" />,
      title: 'Copyright Policy',
      content: (
        <div className="space-y-4">
          <p>
            Company respects the intellectual property of others and asks that users of our Site do the same. In connection with our Site, we have adopted and implemented a policy respecting copyright law that provides for the removal of any infringing materials and for the termination, in appropriate circumstances, of users of our online Site who are repeat infringers of intellectual property rights, including copyrights.
          </p>
          <p>
            If you believe that one of our users is, through the use of our Site, unlawfully infringing the copyright(s) in a work, and wish to have the allegedly infringing material removed, the following information in the form of a written notification (pursuant to 17 U.S.C. § 512(c)) must be provided to our designated Copyright Agent:
          </p>
          <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
            <ol className="list-decimal pl-5 space-y-2">
              <li>your physical or electronic signature;</li>
              <li>identification of the copyrighted work(s) that you claim to have been infringed;</li>
              <li>identification of the material on our services that you claim is infringing and that you request us to remove;</li>
              <li>sufficient information to permit us to locate such material;</li>
              <li>your address, telephone number, and e-mail address;</li>
              <li>a statement that you have a good faith belief that use of the objectionable material is not authorized by the copyright owner, its agent, or under the law; and</li>
              <li>a statement that the information in the notification is accurate, and under penalty of perjury, that you are either the owner of the copyright that has allegedly been infringed or that you are authorized to act on behalf of the copyright owner.</li>
            </ol>
          </div>
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-4">
            <p className="font-bold text-blue-500 mb-2">IMPORTANT NOTICE</p>
            <p>
              Please note that, pursuant to 17 U.S.C. § 512(f), any misrepresentation of material fact (falsities) in a written notification automatically subjects the complaining party to liability for any damages, costs and attorney's fees incurred by us in connection with the written notification and allegation of copyright infringement.
            </p>
          </div>
          <div>
            <p className="font-bold mb-2">Designated Copyright Agent:</p>
            <p>Legalinc Corporate Services Inc.</p>
            <p>Designated Agent: Legalinc Corporate Services Inc.</p>
            <p>Address of Agent: 131 Continental Dr Suite 305 Newark, DE, 19713 US</p>
          </div>
        </div>
      )
    },
    {
      id: 'general',
      icon: <FiInfo className="text-blue-500" />,
      title: 'General',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-3">10.1. Changes</h3>
            <p>
              These Terms are subject to occasional revision, and if we make any substantial changes, we may notify you by sending you an e-mail to the last e-mail address you provided to us (if any), and/or by prominently posting notice of the changes on our Site. You are responsible for providing us with your most current e-mail address. In the event that the last e-mail address that you have provided us is not valid, or for any reason is not capable of delivering to you the notice described above, our dispatch of the e-mail containing such notice will nonetheless constitute effective notice of the changes described in the notice. Continued use of our Site following notice of such changes shall indicate your acknowledgement of such changes and agreement to be bound by the terms and conditions of such changes.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">10.3. Export</h3>
            <p>
              The Site may be subject to U.S. export control laws and may be subject to export or import regulations in other countries. You agree not to export, reexport, or transfer, directly or indirectly, any U.S. technical data acquired from Company, or any products utilizing such data, in violation of the United States export laws or regulations.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">10.4. Disclosures</h3>
            <p>
              Company is located at the address in Section 10.8. If you are a California resident, you may report complaints to the Complaint Assistance Unit of the Division of Consumer Product of the California Department of Consumer Affairs by contacting them in writing at 400 R Street, Sacramento, CA 95814, or by telephone at (800) 952-5210.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">10.5. Electronic Communications</h3>
            <p>
              The communications between you and Company use electronic means, whether you use the Site or send us emails, or whether Company posts notices on the Site or communicates with you via email. For contractual purposes, you (a) consent to receive communications from Company in an electronic form; and (b) agree that all terms and conditions, agreements, notices, disclosures, and other communications that Company provides to you electronically satisfy any legal requirement that such communications would satisfy if it were be in a hardcopy writing. The foregoing does not affect your non-waivable rights.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">10.6. Entire Terms</h3>
            <p>
              These Terms constitute the entire agreement between you and us regarding the use of the Site. Our failure to exercise or enforce any right or provision of these Terms shall not operate as a waiver of such right or provision. The section titles in these Terms are for convenience only and have no legal or contractual effect. The word "including" means "including without limitation". If any provision of these Terms is, for any reason, held to be invalid or unenforceable, the other provisions of these Terms will be unimpaired and the invalid or unenforceable provision will be deemed modified so that it is valid and enforceable to the maximum extent permitted by law. Your relationship to Company is that of an independent contractor, and neither party is an agent or partner of the other. These Terms, and your rights and obligations herein, may not be assigned, subcontracted, delegated, or otherwise transferred by you without Company's prior written consent, and any attempted assignment, subcontract, delegation, or transfer in violation of the foregoing will be null and void. Company may freely assign these Terms. The terms and conditions set forth in these Terms shall be binding upon assignees.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">10.7. Copyright/Trademark Information</h3>
            <p>
              Copyright © 2025 Fielduo, Inc. All rights reserved. All trademarks, logos and service marks ("Marks") displayed on the Site are our property or the property of other third parties. You are not permitted to use these Marks without our prior written consent or the consent of such third party which may own the Marks.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">10.8. Contact Information:</h3>
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <p>Harikrishnan KV</p>
              <p>Address: 2261 Market Street STE 86773, San Francisco, California 94114</p>
              <p>Telephone: +91 9629627092</p>
              <p>Email: hari@fielduo.com</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'disputeResolution',
      icon: <FiShield className="text-blue-500" />,
      title: 'Dispute Resolution',
      content: (
        <div className="space-y-6">
          <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-5">
            <p className="font-bold text-blue-500 mb-3">IMPORTANT: ARBITRATION AGREEMENT</p>
            <p>
              Please read the following arbitration agreement in this Section (the "Arbitration Agreement") carefully. It requires you to arbitrate disputes with Company, its parent companies, subsidiaries, affiliates, successors and assigns and all of their respective officers, directors, employees, agents, and representatives (collectively, the "Company Parties") and limits the manner in which you can seek relief from the Company Parties.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-3">10.2(a) Applicability of Arbitration Agreement</h3>
            <p>
              You agree that any dispute between you and any of the Company Parties relating in any way to the Site, the services offered on the Site (the "Services") or these Terms will be resolved by binding arbitration, rather than in court, except that (1) you and the Company Parties may assert individualized claims in small claims court if the claims qualify, remain in such court and advance solely on an individual, non-class basis; and (2) you or the Company Parties may seek equitable relief in court for infringement or other misuse of intellectual property rights (such as trademarks, trade dress, domain names, trade secrets, copyrights, and patents). This Arbitration Agreement shall survive the expiration or termination of these Terms and shall apply, without limitation, to all claims that arose or were asserted before you agreed to these Terms (in accordance with the preamble) or any prior version of these Terms. This Arbitration Agreement does not preclude you from bringing issues to the attention of federal, state or local agencies. Such agencies can, if the law allows, seek relief against the Company Parties on your behalf. For purposes of this Arbitration Agreement, "Dispute" will also include disputes that arose or involve facts occurring before the existence of this or any prior versions of the Agreement as well as claims that may arise after the termination of these Terms.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-3">10.2(b) Informal Dispute Resolution</h3>
            <p>
              There might be instances when a Dispute arises between you and Company. If that occurs, Company is committed to working with you to reach a reasonable resolution. You and Company agree that good faith informal efforts to resolve Disputes can result in a prompt, low-cost and mutually beneficial outcome. You and Company therefore agree that before either party commences arbitration against the other (or initiates an action in small claims court if a party so elects), we will personally meet and confer telephonically or via videoconference, in a good faith effort to resolve informally any Dispute covered by this Arbitration Agreement ("Informal Dispute Resolution Conference"). If you are represented by counsel, your counsel may participate in the conference, but you will also participate in the conference.
            </p>
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4 mt-3">
              <p className="font-bold mb-2">Notice Information:</p>
              <p>The party initiating a Dispute must give notice to the other party in writing of its intent to initiate an Informal Dispute Resolution Conference ("Notice"), which shall occur within 45 days after the other party receives such Notice, unless an extension is mutually agreed upon by the parties.</p>
              <p className="mt-2">Notice to Company: hari@fielduo.com or 2261 Market Street STE 86773, San Francisco, California 94114</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-3">10.2(c) Arbitration Rules and Forum</h3>
            <p>
              These Terms evidence a transaction involving interstate commerce; and notwithstanding any other provision herein with respect to the applicable substantive law, the Federal Arbitration Act, 9 U.S.C. § 1 et seq., will govern the interpretation and enforcement of this Arbitration Agreement and any arbitration proceedings. If the Informal Dispute Resolution Process described above does not resolve satisfactorily within 60 days after receipt of your Notice, you and Company agree that either party shall have the right to finally resolve the Dispute through binding arbitration. The Federal Arbitration Act governs the interpretation and enforcement of this Arbitration Agreement. The arbitration will be conducted by JAMS, an established alternative dispute resolution provider. Disputes involving claims and counterclaims with an amount in controversy under $250,000, not inclusive of attorneys' fees and interest, shall be subject to JAMS' most current version of the Streamlined Arbitration Rules and procedures; all other claims shall be subject to JAMS's most current version of the Comprehensive Arbitration Rules and Procedures.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-3">10.2(e) Waiver of Jury Trial</h3>
            <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-4">
              <p className="font-bold text-blue-500 mb-2">JURY TRIAL WAIVER</p>
              <p>
                EXCEPT AS SPECIFIED IN SECTION 10.2(A) YOU AND THE COMPANY PARTIES HEREBY WAIVE ANY CONSTITUTIONAL AND STATUTORY RIGHTS TO SUE IN COURT AND HAVE A TRIAL IN FRONT OF A JUDGE OR A JURY. You and the Company Parties are instead electing that all covered claims and disputes shall be resolved exclusively by arbitration under this Arbitration Agreement, except as specified in Section 10.2(a) above. An arbitrator can award on an individual basis the same damages and relief as a court and must follow these Terms as a court would. However, there is no judge or jury in arbitration, and court review of an arbitration award is subject to very limited review.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-3">10.2(f) Waiver of Class or Other Non-Individualized Relief</h3>
            <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-4">
              <p className="font-bold text-blue-500 mb-2">CLASS ACTION WAIVER</p>
              <p>
                YOU AND COMPANY AGREE THAT, EXCEPT AS SPECIFIED IN SUBSECTION 10.2(H) EACH OF US MAY BRING CLAIMS AGAINST THE OTHER ONLY ON AN INDIVIDUAL BASIS AND NOT ON A CLASS, REPRESENTATIVE, OR COLLECTIVE BASIS, AND THE PARTIES HEREBY WAIVE ALL RIGHTS TO HAVE ANY DISPUTE BE BROUGHT, HEARD, ADMINISTERED, RESOLVED, OR ARBITRATED ON A CLASS, COLLECTIVE, REPRESENTATIVE, OR MASS ACTION BASIS. ONLY INDIVIDUAL RELIEF IS AVAILABLE, AND DISPUTES OF MORE THAN ONE CUSTOMER OR USER CANNOT BE ARBITRATED OR CONSOLIDATED WITH THOSE OF ANY OTHER CUSTOMER OR USER.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-3">10.2(i) 30-Day Right to Opt Out</h3>
            <div className="bg-black/30 border border-blue-900/50 rounded-lg p-4">
              <p className="font-bold mb-2">OPT-OUT RIGHTS</p>
              <p>
                You have the right to opt out of the provisions of this Arbitration Agreement by sending a timely written notice of your decision to opt out to the following address: 2261 Market Street STE 86773, San Francisco, California 94114, or email to hari@fielduo.com, within 30 days after first becoming subject to this Arbitration Agreement. Your notice must include your name and address and a clear statement that you want to opt out of this Arbitration Agreement. If you opt out of this Arbitration Agreement, all other parts of these Terms will continue to apply to you. Opting out of this Arbitration Agreement has no effect on any other arbitration agreements that you may currently have with us, or may enter into in the future with us.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        {/* Page Title */}
        <div className="mb-12 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Terms of <span className="text-blue-500">Service</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Last updated: September 16, 2025
          </motion.p>
        </div>

        {/* Introduction Box */}
        <motion.div 
          className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-900/50 rounded-2xl p-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <div className="mt-1 p-2 bg-blue-900/20 rounded-lg">
              <FiInfo className="text-blue-500 text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Please Read Carefully</h2>
              <p className="text-gray-300">
                Welcome to Fielduo. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using Fielduo, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Table of Contents */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                className="flex items-center gap-3 p-3 bg-blue-900/20 hover:bg-blue-900/30 rounded-lg transition-colors text-left"
                whileHover={{ x: 5 }}
                onClick={() => {
                  const element = document.getElementById(section.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    toggleSection(section.id);
                  }
                }}
              >
                <div className="p-2 bg-blue-900/20 rounded-lg">
                  {section.icon}
                </div>
                <span className="font-medium">{section.title}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              id={section.id}
              className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-900/50 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <button
                className="flex justify-between items-center w-full p-6 text-left"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-900/20 rounded-lg">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <motion.div
                  animate={{ rotate: expandedSections[section.id] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {expandedSections[section.id] ? 
                    <FiChevronUp className="text-2xl text-blue-500" /> : 
                    <FiChevronDown className="text-2xl text-gray-400" />
                  }
                </motion.div>
              </button>
              
              <AnimatePresence>
                {expandedSections[section.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-blue-900/50"
                  >
                    <div className="p-6 pt-2 text-gray-300">
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div 
          className="mt-16 bg-gradient-to-br from-blue-900/20 to-black border border-blue-700/30 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <FiMail className="text-blue-500" /> Email
              </h3>
              <p className="text-gray-300">hari@fielduo.com</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <FiFileText className="text-blue-500" /> Mailing Address
              </h3>
              <p className="text-gray-300">
                2261 Market Street STE 86773<br />
                San Francisco, California 94114
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default TermsOfService;