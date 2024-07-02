import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import {   ShowAllPayroll } from "../../apis/Payroll";
export default function Target(params) {
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
  const [month, setMonth] = useState('');
  const [today, settoday] = useState(new Date());
  const [year, setYear] = useState('');
  const [Employee, SetEmployee] = useState();
  const fetchData = async () => {


    try {
      const userFromApi = await ShowAllPayroll();
      SetEmployee(userFromApi);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error if necessary
    }
  };
  useEffect(() => {
    const monthValue = (today.getMonth() + 1).toString().padStart(2, '0');
    const yearValue = today.getFullYear();
    setMonth(monthValue);
    setYear(yearValue);
    setSearchQuery(yearValue + "-" + monthValue);


    fetchData();
  }, []);

  // Filter employees based on the search query
  const filteredEmployees = Employee?.data?.filter((item) =>
    Object.values(item).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

    return <div class="main-panel">
    <div class="content-wrapper">
      <div class="row target mt-3">
        <div class="col-xl-4 d-flex grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-wrap justify-content-between">
                <h4 class="card-title mb-3">Month Targets</h4>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="row">
                    <div class="col-lg-12">
                      <div id="circleProgress7" class="progressbar-js-circle rounded p-3"><svg viewBox="0 0 100 100" ><path d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90" stroke="#1f2130" stroke-width="10" fill-opacity="0"></path><path d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90" stroke="rgb(46,32,199)" stroke-width="10" fill-opacity="0" style={{strokeDasharray: "282.783, 282.783", strokeDashoffset:" 70.6958"}}></path></svg><div class="progressbar-text" style={{position: "absolute", left: "50%", top: "50%", padding: "0px", margin: "0px", transform: "translate(-50%, -50%)", color: "rgb(156, 159, 166)", fontSize: "1.875rem", fontWeight: "700"}}><p class="text-center mb-0">Score</p>75%</div></div>
                    </div>
                    <div class="col-lg-12">
                      <ul class="session-by-channel-legend">
                        <li>
                          <div>Daily Attendance (24)</div>
                          <div>4 (100%)</div>
                        </li>
                       
                        <li>
                          <div>Monthly Payroll Submition </div>
                          <div>Not Active</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 d-flex grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-wrap justify-content-between">
                <h4 class="card-title mb-3">Request Approvable Performance</h4>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="row">
                    <div class="col-lg-12">
                      <div id="circleProgress7" class="progressbar-js-circle rounded p-3"><svg viewBox="0 0 100 100" ><path d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90" stroke="#1f2130" stroke-width="10" fill-opacity="0"></path><path d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90" stroke="rgb(46,32,199)" stroke-width="10" fill-opacity="0" style={{strokeDasharray: "282.783, 282.783", strokeDashoffset:" 70.6958"}}></path></svg><div class="progressbar-text" style={{position: "absolute", left: "50%", top: "50%", padding: "0px", margin: "0px", transform: "translate(-50%, -50%)", color: "rgb(156, 159, 166)", fontSize: "1.875rem", fontWeight: "700"}}><p class="text-center mb-0">Score</p>75%</div></div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
          <div className="card-body">
          <h4 className="card-title">Performace Report</h4>
            <div className="row">
              <div className="col-12">
                <div className="table-responsive">
                  <div id="order-listing_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                    <div className="row">
                      <div className="col-sm-12 col-md-4">
                        <div id="order-listing_filter" className="sortable-table-1">
                          <label>
                            <input
                              type="month"
                              className="form-control"
                              placeholder="Search"
                              min={"2024-01"}
                              // max={year+"-"+month}
                              aria-controls="order-listing"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                            />
                          </label>
                        </div>
                      </div>

                    </div>
                    {filteredEmployees?.length > 0 ? (
                      filteredEmployees.map((item, index) => (
                        <>
                      <div class="row">
                        <div class="col-lg-6 pl-0 mt-5 mb-2 d-flex justify-content-around">
                          {/* <p>Due Date : {item.date}</p> */}
                        </div>
                        <div class="col-lg-6 pl-0 mt-5 mb-2 d-flex justify-content-around">
                          {/* <Link type="button" to={"/Report-submition/" + item.id + "/edit"} className="btn btn-outline-secondary btn-icon-text ">
                            Edit
                            <i className="typcn typcn-edit btn-icon-append"></i>
                          </Link> */}

                        </div>
                      </div>
                      <div class="container-fluid  d-flex justify-content-center w-100">
                        <div class=" w-100">
                          <table class="table">
                            <thead>
                              <tr class="">
                                <th>#</th>
                                <th>Name</th>
                                <th >hrcode</th>
                                <th>department</th>
                                <th >Grade</th>
                                <th >Presence Margin</th>
                                <th >Final Rate</th>

                                
                              </tr>
                            </thead>
                            <tbody>
                              {
                                item.data.map((temp,i)=>{
                                  return temp.department=="Human Resource"||temp.department=="Administration"?<tr class="text-end">
                                  <td class="text-left">{i+1}</td>
                                  <td class="text-left">{temp.name}</td>
                                  <td class="text-left">{temp.hr_code}</td>
                                  <td class="text-left">{temp.department}</td>
                               
                                  <td class="text-left">{temp.Supervisor==1?<>{temp.grade?temp.grade:0}</>:<input type="number" value={temp.grade?temp.grade:0} min={0} max={10}/>}</td>
                                  <td class="text-left">{temp.PresenceMargin}</td>
                                
                                </tr>:<></>
                                })
                              }

                            </tbody>
                          </table>
                        </div>
                      </div>
                      </>
                      ))
                    ) : (
                      <tr>
                        <td style={{ textAlign: "center" }} colSpan={12}>No matching records found.</td>
                      </tr>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
   
</div>
}