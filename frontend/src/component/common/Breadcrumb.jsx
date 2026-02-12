import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";

const safeText = (value) => {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }
  return "";
};

const CustomBreadcrumb = ({ productName }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="custom-breadcrumb">
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
        Home
      </Breadcrumb.Item>

      {pathnames.map((path, index) => {
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        const label = isLast
          ? safeText(productName)
          : safeText(path).replace(/-/g, " ");

        return isLast ? (
          <Breadcrumb.Item active key={routeTo}>
            {label}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{ to: routeTo }}
            key={routeTo}
          >
            {label}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
