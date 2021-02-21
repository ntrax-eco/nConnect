import React, { useEffect, useState } from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CButton,
  CCollapse,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../charts/ChartLineSimple";
import ChartBarSimple from "../charts/ChartBarSimple";

const WidgetsDropdown = () => {
  const [product, setProduct] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [details, setDetails] = useState([]);

  const fields = ["Agency", "Email ID", "Product", "show_details"];
  useEffect(() => {
    fetch("http://localhost:8080/api/agency/product")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setProduct(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const showDetails = (param) => {
    fetch(`http://localhost:8080/api/agency/${param}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setProductDetails(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };
  return (
    <>
      <CRow>
        {!!product.length &&
          product.map((prod, ind) => {
            return (
              <CCol sm="6" lg="3" key={ind}>
                <CWidgetDropdown
                  onClick={() => {
                    showDetails(prod);
                  }}
                  color="gradient-info"
                  //  header="9.823"
                  text={prod}
                  style={{ minHeight: "180px" }}
                  footerSlot={
                    <ChartLineSimple
                      pointed
                      className="c-chart-wrapper mt-3 mx-3"
                      style={{ height: "70px" }}
                      dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                      pointHoverBackgroundColor="info"
                      label="Members"
                      labels="months"
                    />
                  }
                ></CWidgetDropdown>
              </CCol>
            );
          })}
      </CRow>
      {!!productDetails.length && (
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              Product Table
              {/*<DocsLink name="CModal" />*/}
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={productDetails}
                fields={fields}
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  show_details: (item, index) => {
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="round"
                          size="sm"
                          onClick={() => {
                            toggleDetails(index);
                          }}
                        >
                          {details.includes(index) ? "Hide" : "Edit"}
                        </CButton>
                      </td>
                    );
                  },
                  details: (item, index) => {
                    return (
                      <CCollapse show={details.includes(index)}>
                        <CCardBody>
                          <p>January</p>
                          <input type="text" value={item.January} />
                          <p>February</p>
                          <input type="text" value={item.February} />
                          <p>March</p>
                          <input type="text" value={item.March} />
                          <p>April</p>
                          <input type="text" value={item.April} />
                          <p>May</p>
                          <input type="text" value={item.May} />
                          <p>June</p>
                          <input type="text" value={item.June} />
                          <p>July</p>
                          <input type="text" value={item.July} />
                          <p>August</p>
                          <input type="text" value={item.August} />
                          <p>September</p>
                          <input type="text" value={item.September} />
                          <p>October</p>
                          <input type="text" value={item.October} />
                          <p>November</p>
                          <input type="text" value={item.November} />
                          <p>December</p>
                          <input type="text" value={item.December} />
                        </CCardBody>
                      </CCollapse>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      )}
    </>
  );
};

export default WidgetsDropdown;
