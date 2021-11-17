const { Park } = require('../models');

const parkdata = [
  {
    name: ''
  },
  {
 
  },
  {
    title: 'Why The Hell Would I Use Node.js?',
    content: 'Node.js shines in real-time web applications employing push technology over websockets. What is so revolutionary about that? Well, after over 20 years of stateless-web based on the stateless request-response paradigm, we finally have web applications with real-time, two-way connections, where both the client and server can initiate communication, allowing them to exchange data freely. ',
    user_id: 1
  },
  {
    title: 'Why Use AngularJS?',
    content: 'AngularJS is an open sourced frontend web framework used to solve obstacles presented by single-page applications. The web framework provides a client-side model-view controller (MVC) and a model-view-view model architecture. It also provides components generally found in rich internet applications. ',
    user_id: 4
  },
  {
    title: 'Real-Life Use-Cases for useCallback and useMemo',
    content: 'One of my friends gives his react interview, and tell me, his interviewer asks him to give some real-life use-cases where he actually uses the useCallback and useMemo to solve his problem. And unfortunately, he got stuck at that point.',
    user_id: 7
  },
  {
    title: 'How to create a multi-language app with react native, i18next and hooks',
    content: 'There are different reasons why an application is required to be available in more than one language. In this beautiful post we are going to see how to use i18next to be able to change the language in React Native and save the preferred language easily and quickly.',
    user_id: 4
  },
  {
    title: 'What is Python? Powerful, intuitive programming',
    content: 'However, over the past few years, Python has emerged as a first-class citizen in modern software development, infrastructure management, and data analysis. It is no longer a back-room utility language, but a major force in web application creation and systems management, and a key driver of the explosion in big data analytics and machine intelligence.',
    user_id: 1
  },
  {
    title: 'How to Write a Good README',
    content: 'When writing a README, always keep in mind that you will need your friends, or in this case other developers, to understand your code. For instance have a look at this project. As you can see it does not have a detailed README, a description, or any guidance. With a project like this on GitHub no one will be able to understand what it does no matter how much time you took creating it, right? Now have a look at this project. Here, you are able to understand what the project does, what it entails, and how to get started if you need to use or want to contribute to the project.',
    user_id: 1
  },
  {
    title: 'The C++ programming language in cheminformatics',
    content: 'This paper describes salient features of the C++ programming language and its programming ecosystem, with emphasis on how the language affects scientific software development. Brief history of C++ and its predecessor the C language is provided. Most important aspects of the language that define models of programming are described in greater detail and illustrated with code examples. Special attention is paid to the interoperability between C++ and other high-level languages commonly used in cheminformatics, machine learning, data processing and statistical computing.',
    user_id: 9
  },
  {
    title: 'Java on VS Code Adds Gradle Tool, Simplifies Code Actions',
    content: 'Java on VS Code -- the team behind the super-popular Extension Pack for Java and much more -- already announced the latter item: the Language Support for Java by Red Hat extension. Like many similar tools in the VS Code marketplace, it leverages an open source language server (in this case, Eclipse JDT Language Server) to provide language-specific features and functionality when working on Java files.',
    user_id: 5
  },
  {
    title: 'A Beginner’s Guide to Handlebars',
    content: 'Nowadays the majority of the Web consists of dynamic applications in which the data keep changing frequently. As a result, there is a continuous need to update the data rendered on the browser. This is where JavaScript templating engines come to the rescue and become so useful. They simplify the process of manually updating the view and at the same time they improve the structure of the application by allowing developers to separate the business logic from the rest of the code. ',
    user_id: 3
  },
  {
    title: 'Compression boost for high speed JTAG',
    content: 'The  XJFlash software already provides rapid erase and programming, but by adding compression to its data transfer algorithm, the verify times are now also shorter. 256 Mbit can now be verified in 5.4 seconds, depending on the circuit and combining this with its rapid erase and program cycles makes XJFlash significantly faster than other programmers.',
    user_id: 10
  },
  {
    title: 'What to know about viruses',
    content: 'Viruses are microscopic particles that exist almost everywhere on Earth. They are present in animals, plants, and other living organisms, and they can sometimes cause diseases.',
    user_id: 8
  },
  {
    title: 'Photoshop Isn’t King Here: The Speciality Programs That Are Just Plain Better',
    content: 'While I’ll be referencing Photoshop throughout this article, as it’s my tool of choice, a lot of these points will apply to alternate “jack of all trades” photo editing tools, like Affinity Photo. Furthermore, these aren’t the only great specialty programs out there — these are just the ones that I’ve worked extensively with and have found a place in my workflow. If you’ve got a program like these that you rely on, let me know in the comments!',
    user_id: 3
  },
  {
    title: 'Coding platform GitLab lifts IPO pricing range, eyes nearly $10 bln valuation',
    content: 'Coding platform GitLab Inc is now targeting a valuation of $10 billion in its U.S. listing after raising the price range for its initial public offering, as demand for high-growth companies stays robust despite recent stock market gyrations.',
    user_id: 3
  },
  {
    title: 'How to choose the right coding course for your kids',
      content: 'Questions like this have stopped many in their tracks before they have even given themselves the chance to begin. First, we have to plan then we have to learn. After that, we have to be good enough to create something.',
    user_id: 7
  },
  {
    title: 'finding the perfect programmer for the job is easy with the right tools',
    content: 'How do you find the best programmer for your company. To start, companies need a strong hiring strategy to find and successfully hire the right people. Hiring managers and human resources leaders must be organized and thorough to respond to the changing needs of digital transformation projects.',
    user_id: 6
  },
  {
    title: 'Chip Shortage Creates New Power Players',
    content: 'Low-profile chip makers with aging factories have become surprisingly powerful, leading to industry changes that may outlive the pandemic-fueled supply crunch.',
    user_id: 4
  },
  {
    title: 'Tesla releases Dojo whitepaper',
    content: 'This standard specifies Tesla arithmetic formats and methods for the new 8-bit and 16-bit binary floating-point arithmetic in computer programming environments for deep learning neural network training. This standard also specifies exception conditions and the status flags thereof. An implementation of a floating-point system conforming to this standard may be realized entirely in software, entirely in hardware, or in any combination of software and hardware.',
    user_id: 6
  },
  {
    title: 'Linux To Start Seeing Enablement Patches For Intel Raptor Lake',
    content: 'Raptor Lake is anticipated to be the 13th Gen Core processors and successor to the recently launched Alder Lake processors. Previous leaks around Raptor Lake have pointed to the new "Raptor Cove" performance core and an improved Gracemont power efficiency core. Leaks have also suggested Raptor Lake S could top out at a 24 core / 32 thread design. The launch of Raptor Lake is expected in 2022.',
    user_id: 7
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;