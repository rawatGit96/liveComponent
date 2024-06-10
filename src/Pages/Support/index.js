import SearchField from "Components/Fields/searchField";
import React from "react";
import styled from "styled-components";
import logo from "Assests/logo.png";
import { FlexColumn, Line } from "Pages/styles";
import { font, theme } from "Utils/theme";
import { Col, Row } from "antd";
import Button from "Components/Fields/button";
import { HeadSetIcon } from "Utils/svgIcons";

const Card = ({ heading, content }) => {
  return (
    <CardWrapper>
      <div className="card-heading">{heading}</div>
      <div className="content">{content}</div>
    </CardWrapper>
  );
};
const CardWrapper = styled(FlexColumn)`
  padding: 0 40px;
  .content {
    color: ${theme.greyText};
  }
  .card-heading {
    font-size: ${font.mid2};
    font-weight: 600;
    line-height: 24px;
  }
`;

const faqListing = [
  {
    id: 1,
    data: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lore ipsum lore ipsum lorem ipsum? ",
  },
  {
    id: 2,
    data: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lore ipsum lore ipsum lorem ipsum? ",
  },
  {
    id: 3,
    data: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lore ipsum lore ipsum lorem ipsum? ",
  },
  {
    id: 4,
    data: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lore ipsum lore ipsum lorem ipsum? ",
  },
  {
    id: 5,
    data: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lore ipsum lore ipsum lorem ipsum? ",
  },
];

const Support = () => {
  const handleSearchData = () => {};
  return (
    <SupportWrapper>
      <div className="main-heading">Support</div>
      <FlexColumn className="top-section">
        <img src={logo} height="146px" width="209px" alt="" />
        <div className="heading">How can we help you today?</div>
        <SearchField handleSearch={handleSearchData} />
      </FlexColumn>
      <Line />
      <div className="help">Help Center</div>
      <Line />
      <Row gutter={[5, 5]} className="row-section">
        <Col xs={24} sm={9} className="card-listing">
          <Card
            heading="My Account"
            content="Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lore ipsum lore ipsum lorem ipsum "
          />
          <Card
            heading="Billing & Subscriptions"
            content="Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lore ipsum lore ipsum lorem ipsum "
          />
          <Card
            heading="Copyright & Legal"
            content="Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lore ipsum lore ipsum lorem ipsum "
          />
        </Col>
        <Col xs={24} sm={9}>
          <Card
            heading="Mobile App"
            content="Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lore ipsum lore ipsum lorem ipsum "
          />
        </Col>
        <Col xs={24} sm={6} className="right-section-cards">
          <FAQCards heading="FAQS" listing={faqListing} />
          <NeedSupportWrapper>
            <div className="right-card-heading">
              Need support?
              <HeadSetIcon />
            </div>
            <div className="right-card-content">
              Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lore ipsum lore
              ipsum lorem ipsum
            </div>
            <div className="button-wrapper">
              <Button
                text="Contact Support"
                bg={theme.primaryColor}
                width="160px"
                br="3px"
                type="primary"
              />
            </div>
          </NeedSupportWrapper>
        </Col>
      </Row>
    </SupportWrapper>
  );
};

export default Support;

const FAQCards = ({ heading, listing }) => {
  return (
    <FAQWrapper>
      <div className="right-card-heading">{heading}</div>
      <div className="faq-listing">
        {listing.map((list) => (
          <div key={list?.id} className="faq-list">
            {list?.data}
          </div>
        ))}
      </div>
    </FAQWrapper>
  );
};

const RightCardLayout = styled.div`
  display: flex;
  flex-direction: column;
  background: ${theme.supportCard};
  padding: 20px;
  border-radius: 3px;
  color: ${theme.greyText};
  .right-card-heading {
    font-size: ${font.mid2};
    font-weight: 600;
    color: ${theme.white};
  }
`;
const FAQWrapper = styled(RightCardLayout)`
  .faq-list {
    padding: 10px 0;
  }
  .faq-listing {
    height: 250px;
    overflow: auto;
  }
  .faq-listing::-webkit-scrollbar {
    width: 0px;
  }
`;

const NeedSupportWrapper = styled(RightCardLayout)`
  gap: 15px;
  min-height: 250px;
  padding: 15px 25px;
  .button-wrapper {
    text-align: center;
    margin-bottom: 15px;
  }
  .right-card-heading {
    svg {
      margin: 0 10px;
    }
  }
  .right-card-content {
    height: 100%;
  }
`;

const SupportWrapper = styled.div`
  .main-heading {
    font-size: ${font.mid2};
    font-weight: 400;
    line-height: 24px;
  }
  .heading,
  .help {
    font-size: ${font.mid2};
    font-weight: 600;
    line-height: 24px;
  }
  .top-section {
    align-items: center;
  }
  .search-field {
    width: 500px;
    margin: 20px 0;
  }
  .row-section {
    padding: 25px 0 0 20px;
  }
  .help {
    padding: 20px 0;
  }
  .card-listing {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
  .right-section-cards {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
