import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import {
  FaYoutube,
  FaPhotoVideo,
  FaVideo,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGlobe,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import project1Img from "../assets/images/project1.webp";
import project2Img from "../assets/images/lp_prof.webp";
import project3Img from "../assets/images/stk_profil.webp";



const projects = [
  {
    title: "ArtKings Builders Co.",
    description: "Complete web brand identity for a building company.",
    tags: ["Branding", "Design", "Website"],
    image: project1Img,
    liveUrl: "https://www.artkingsbuilders.co.ke/",
    socialLinks: [
      { platform: "instagram", url: "https://instagram.com/luxe" },
      { platform: "facebook", url: "https://facebook.com/luxe" },
    ],
  },
  {
    title: "Legacy Pixels Ke",
    description: "Photography, Digital campaign, social strategy & influencer outreach.",
    tags: ["Marketing", "Social Media", "Photography", "Videography"],
    image: project2Img,
    liveUrl: "",
    socialLinks: [
      { platform: "instagram", url: "https://www.instagram.com/legacy_pixels_ke?igsh=dnFheG9za2Ezbm9k"},
      { platform: "video", url: "https://1024terabox.com/s/1WyPWMeAc6vmpPHa6rsz2Bw" },
      { platform: "photo", url: "https://wa.me/c/254741553806" },

      
    ],
  },
  {
    title: "St Kizito Vocational Training Institute",
    description: "Event photography and marketing.",
    tags: ["Photography", "Marketing", "Event"],
    image: project3Img,
    liveUrl: "https://stkizito.ac.ke/",
    socialLinks: [
      { platform: "photo", url: "https://1024terabox.com/s/18_7Nnspx0RcEdQ9zs8bW6Q" },
      { platform: "facebook", url: "https://www.facebook.com/stkizitovti" },
      { platform: "youtube", url: "https://www.youtube.com/@St.Kizitovti" },
      
    ],
  },
];

// Styled Components
const Section = styled.section`
   background: linear-gradient(135deg, ${colors.royalBlue}, #001d6e);
  color: ${colors.lightBlue};
  padding: 4rem 1rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: ${colors.lightBlue};
  margin-bottom: 2.5rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileSlider = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const SlideWrapper = styled.div`
  width: 90vw;
  max-width: 360px;
`;

const NavButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 1rem;

  button {
    background: ${colors.limeGreen};
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    font-size: 0.95rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: ${colors.royalBlue};
    }
  }
`;

const Card = styled.div`
  background: #001d6e;
  color: ${colors.lightBlue};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  padding: 1.5rem;

  &:hover {
    transform: translateY(-6px);
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.6rem;
  color: ${colors.limeGreen};
`;

const Description = styled.p`
  margin: 0.8rem 0;
  color: ${colors.lightBlue};
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.8rem;
`;


const Tag = styled.span`
  background: ${colors.lightBlue};
  color: #001d6e;
  font-size: 0.85rem;
  padding: 0.4rem 1rem;
  border-radius: 999px;
`;
const Links = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  a {
    color: ${colors.lightBlue};
    font-size: 1.5rem;
    transition: color 0.3s ease;

    &:hover {
      color: ${colors.limeGreen};
    }
  }
`;

// Social icon mapper
const getIcon = (platform: string) => {
  switch (platform) {
    case "instagram":
      return <FaInstagram />;
    case "facebook":
      return <FaFacebook />;
    case "twitter":
      return <FaTwitter />;
    case "linkedin":
      return <FaLinkedin />;
    case "photo":
      return <FaPhotoVideo/>;
    case "video":
      return <FaVideo />;
    case "youtube":
      return <FaYoutube />;
    default:
      return null;
  }
};

const Projects: React.FC = () => {
  const [slide, setSlide] = useState(0);
  const nextSlide = () => setSlide((prev) => (prev + 1) % projects.length);
  const prevSlide = () => setSlide((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <Section id="projects">
      <Container>
        <Title>Our Portfolio</Title>

        {/* Desktop Grid */}
        <Grid>
          {projects.map((project, i) => (
            <Card key={i}>
              <Thumbnail src={project.image} alt={project.title} loading="lazy" />
              <Content>
                <ProjectTitle>{project.title}</ProjectTitle>
                <Description>{project.description}</Description>
                <TagList>
                  {project.tags.map((tag, j) => (
                    <Tag key={j}>{tag}</Tag>
                  ))}
                </TagList>
                <Links>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <FaGlobe />
                    </a>
                  )}
                  {project.socialLinks.map((link, k) => (
                    <a key={k} href={link.url} target="_blank" rel="noopener noreferrer">
                      {getIcon(link.platform)}
                    </a>
                  ))}
                </Links>
              </Content>
            </Card>
          ))}
        </Grid>

        {/* Mobile Slider */}
        <MobileSlider>
          <SlideWrapper>
            <Card>
              <Thumbnail src={projects[slide].image} alt={projects[slide].title} loading="lazy" />
              <Content>
                <ProjectTitle>{projects[slide].title}</ProjectTitle>
                <Description>{projects[slide].description}</Description>
                <TagList>
                  {projects[slide].tags.map((tag, j) => (
                    <Tag key={j}>{tag}</Tag>
                  ))}
                </TagList>
                <Links>
                  {projects[slide].liveUrl && (
                    <a href={projects[slide].liveUrl} target="_blank" rel="noopener noreferrer">
                      <FaGlobe />
                    </a>
                  )}
                  {projects[slide].socialLinks.map((link, k) => (
                    <a key={k} href={link.url} target="_blank" rel="noopener noreferrer">
                      {getIcon(link.platform)}
                    </a>
                  ))}
                </Links>
              </Content>
            </Card>
          </SlideWrapper>

          <NavButtons>
            <button onClick={prevSlide}>
              <FaChevronLeft /> Prev
            </button>
            <button onClick={nextSlide}>
              Next <FaChevronRight />
            </button>
          </NavButtons>
        </MobileSlider>
      </Container>
    </Section>
  );
};

export default Projects;