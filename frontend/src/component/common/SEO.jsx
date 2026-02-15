import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  keywords,
  favicon,
}) => {
  return (
    <Helmet>
      <title>
        {title || "Buy Healthy Dry Fruits Online at Best Price in India"}
      </title>

      <meta
        name="description"
        content={
          description ||
          "Shop premium quality dry fruits online at best prices."
        }
      />

      <meta
        name="keywords"
        content={
          keywords ||
          "dry fruits, almonds, cashews, walnuts"
        }
      />

      {/* OpenGraph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};

export default SEO;
