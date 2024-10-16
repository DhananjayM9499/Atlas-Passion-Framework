import React, { useState } from "react";
import "./AtlasSearch.css"; // Assuming you create a CSS file for styles
import Navbar from "../Component/Navbar";
import welcome from "../Images/welcome.png";
import Image from "../Images/homeImage.png";

const AtlasSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const resultListRef = React.useRef(null);

  const handleSearch = () => {
    fetch(
      `http://localhost:8983/solr/research/select?indent=true&q.op=OR&q=${searchQuery}&useParams=`
    )
      .then((response) => response.json())
      .then((data) => {
        const fetchedResults = data.response.docs.map((doc, index) => ({
          ...doc,
          showContent: false,
          id: doc.id || index,
        }));

        setResults(fetchedResults);
        setNoResults(fetchedResults.length === 0);

        // Scroll to the results list after a short delay
        setTimeout(() => {
          if (resultListRef.current) {
            resultListRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setNoResults(true);
      });
  };

  const toggleContent = (index) => {
    setResults((prevResults) =>
      prevResults.map((result, i) =>
        i === index ? { ...result, showContent: !result.showContent } : result
      )
    );
  };

  return (
    <div>
      <Navbar />
      <header className="header">
        <div className="header_div">
          <div className="vertical-center">
            <img src={welcome} alt="" />
            <h3
              style={{
                color: "#e50000",
                textAlign: "start",
                marginLeft: "50px",
              }}
            >
              The Future of Knowledge, Insight and Innovation
            </h3>
            <div>
              <input
                className="search-bar"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={handleSearch}>
                <b>Search</b>
              </button>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <img
              style={{
                height: "auto",
                width: "450px",
              }}
              src={Image}
              alt="Img"
            />
          </div>
        </div>
        <div className="header_div mt-4">
          <div className="content-section header_container">
            <h2>What is Data?</h2>
            <p>
              Data refers to a collection of raw facts, figures, and statistics
              that are collected and used for analysis, research, and
              decision-making. It can come in various forms, such as numbers,
              text, images, or audio, and is gathered from multiple sources,
              including experiments, surveys, databases, and observations.
            </p>
          </div>

          <div className="content-section header_container">
            <h2>PASSION Framework - Data’s Role Across Dimensions</h2>
            <div>
              <p>
                <strong>Probing:</strong> Data is the starting point for inquiry
                and exploration...
              </p>
            </div>
          </div>

          <div className="content-section header_container">
            <h2>PRUTL Dimensions: Data's Ethical Impact</h2>
            <p>
              <strong>Positive Soul:</strong> Data fosters trust in
              institutions...
            </p>
            <p>
              Data’s Role in Shaping the Future: Data is not just a commodity...
            </p>
          </div>
        </div>
      </header>

      <div style={{ borderBottom: "2px solid " }}></div>

      <div style={{ margin: "8px" }}>
        <div id="resultsList" ref={resultListRef}>
          {results.map((result, index) => {
            let jsonData = {};

            // Attempt to parse result._src_ as JSON
            try {
              jsonData = JSON.parse(result._src_); // Parse the string into a JSON object
            } catch (e) {
              console.error("Error parsing JSON:", e);
            }

            return (
              <div className="result_container" key={result.id || index}>
                {/* Title */}
                <h1
                  onClick={() => toggleContent(index)}
                  style={{ cursor: "pointer" }}
                >
                  {jsonData.title || ""}
                </h1>

                {/* Show content only if showContent is true */}
                {result.showContent && (
                  <div>
                    {/* Description */}
                    <p>{jsonData.description || ""}</p>

                    {/* Sections */}
                    {jsonData.sections &&
                      jsonData.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                          {/* Section Title */}
                          <h2>{section.title || section.name || ""}</h2>

                          {/* Dimensions */}
                          {section.dimensions &&
                            section.dimensions.map((dimension, dimIndex) => (
                              <div key={dimIndex}>
                                <h3>
                                  {dimension.name || dimension.dimension || ""}
                                </h3>
                                <p>
                                  {dimension.description ||
                                    dimension.content ||
                                    ""}
                                </p>

                                {/* Sub-Dimensions */}
                                {dimension.sub_dimensions &&
                                  dimension.sub_dimensions.map(
                                    (subdimension, subdimIndex) => (
                                      <div key={subdimIndex}>
                                        <h4>{subdimension.name || ""}</h4>
                                        <p>{subdimension.description || ""}</p>
                                      </div>
                                    )
                                  )}
                              </div>
                            ))}

                          {/* Subsections */}
                          {section.subsections &&
                            section.subsections.map((subsection, subIndex) => (
                              <div key={subIndex}>
                                <h3>{subsection.category || ""}</h3>

                                {/* Sub-dimensions for subsections */}
                                {subsection.subdimensions &&
                                  subsection.subdimensions.map(
                                    (subdimension, subdimIndex) => (
                                      <div key={subdimIndex}>
                                        <h4>
                                          {subdimension.subdimension || ""}
                                        </h4>
                                        <p>{subdimension.content || ""}</p>
                                      </div>
                                    )
                                  )}
                              </div>
                            ))}
                          {/* Domains */}
                          {section.domains &&
                            section.domains.map((domain, domainIndex) => (
                              <div key={domainIndex}>
                                <h3>{domain.name || "No domain name"}</h3>
                                <p>
                                  {domain.description ||
                                    "No domain description available."}
                                </p>
                              </div>
                            ))}
                          {/* Conclusion */}
                          {section.conclusion && (
                            <div>
                              <h2>
                                <strong>Conclusion:</strong>
                              </h2>
                              <p>{section.conclusion || "No conclusion."}</p>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {noResults && <p className="no-results">No results found.</p>}
      </div>
    </div>
  );
};

export default AtlasSearch;