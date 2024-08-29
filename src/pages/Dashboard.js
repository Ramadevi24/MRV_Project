import React from 'react';
import SideBar2 from '../components/SideBar2';
// import Morris from 'morris.js';
// import 'morris.js/morris.css';
// import jQuery from 'jquery';
// import 'jquery-knob/dist/jquery.knob.min';
// import 'jquery-sparkline/jquery.sparkline.min';
// import 'raphael/raphael.min';

// import HeadCSS from './partials/HeadCSS';
// import Menu from './partials/Menu';
// import Topbar from './partials/Topbar';
// import PageTitle from './partials/PageTitle';

const Dashboard = () => {
//   React.useEffect(() => {
//     // Initialize Morris charts, Knob, Sparkline, etc.
//     Morris.Bar({
//       element: 'morris-bar-example',
//       data: [{ y: '2020', a: 100, b: 90 }],
//       xkey: 'y',
//       ykeys: ['a', 'b'],
//       labels: ['Series A', 'Series B'],
//       hideHover: 'auto',
//       resize: true,
//     });

//     jQuery('.knob').knob();
//     jQuery('#sparkline1').sparkline([5, 6, 7, 2, 0, -4, -2, 4], {
//       type: 'bar',
//       height: '40',
//       barWidth: '8',
//       barSpacing: '5',
//       barColor: '#7a08c2',
//     });
//   }, []);

  return (
    <div className="layout-wrapper">
      {/* <head>
        <TitleMeta title="Dashboard" />
        <link href="assets/libs/morris.js/morris.css" rel="stylesheet" type="text/css" />
        <HeadCSS />
      </head> */}

      <body>
      
      <SideBar2 />

        <div className="page-content">
          {/* <Topbar /> */}
          <div className="px-3">
            <div className="container-fluid">
              {/* <PageTitle subtitle="Dashtrap" title="Dashboard" /> */}

              <div className="row">
                <div className="col-md-6 col-xl-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="mb-4">
                        <span className="badge badge-soft-primary float-end">Daily</span>
                        <h5 className="card-title mb-0">Cost per Unit</h5>
                      </div>
                      <div className="row d-flex align-items-center mb-4">
                        <div className="col-8">
                          <h2 className="d-flex align-items-center mb-0">$17.21</h2>
                        </div>
                        <div className="col-4 text-end">
                          <span className="text-muted">12.5% <i className="mdi mdi-arrow-up text-success"></i></span>
                        </div>
                      </div>
                      <div className="progress shadow-sm" style={{ height: '5px' }}>
                        <div className="progress-bar bg-success" role="progressbar" style={{ width: '57%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-xl-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="mb-4">
                        <span className="badge badge-soft-primary float-end">Per Week</span>
                        <h5 className="card-title mb-0">Market Revenue</h5>
                      </div>
                      <div className="row d-flex align-items-center mb-4">
                        <div className="col-8">
                          <h2 className="d-flex align-items-center mb-0">$1875.54</h2>
                        </div>
                        <div className="col-4 text-end">
                          <span className="text-muted">18.71% <i className="mdi mdi-arrow-down text-danger"></i></span>
                        </div>
                      </div>
                      <div className="progress shadow-sm" style={{ height: '5px' }}>
                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: '57%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-xl-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="mb-4">
                        <span className="badge badge-soft-primary float-end">Per Month</span>
                        <h5 className="card-title mb-0">Expenses</h5>
                      </div>
                      <div className="row d-flex align-items-center mb-4">
                        <div className="col-8">
                          <h2 className="d-flex align-items-center mb-0">$784.62</h2>
                        </div>
                        <div className="col-4 text-end">
                          <span className="text-muted">57% <i className="mdi mdi-arrow-up text-success"></i></span>
                        </div>
                      </div>
                      <div className="progress shadow-sm" style={{ height: '5px' }}>
                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: '57%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-xl-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="mb-4">
                        <span className="badge badge-soft-primary float-end">All Time</span>
                        <h5 className="card-title mb-0">Daily Visits</h5>
                      </div>
                      <div className="row d-flex align-items-center mb-4">
                        <div className="col-8">
                          <h2 className="d-flex align-items-center mb-0">1,15,187</h2>
                        </div>
                        <div className="col-4 text-end">
                          <span className="text-muted">17.8% <i className="mdi mdi-arrow-down text-danger"></i></span>
                        </div>
                      </div>
                      <div className="progress shadow-sm" style={{ height: '5px' }}>
                        <div className="progress-bar bg-info" role="progressbar" style={{ width: '57%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-5">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Sales Analytics</h4>
                      <p className="card-subtitle mb-4">From date of 1st Jan 2020 to continue</p>
                      <div id="morris-bar-example" className="morris-chart"></div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Stock</h4>
                      <p className="card-subtitle mb-4">Recent Stock</p>
                      <div className="text-center">
                        <input
                          data-plugin="knob"
                          data-width="165"
                          data-height="165"
                          data-linecap="round"
                          data-fgColor="#7a08c2"
                          value="95"
                          data-skin="tron"
                          data-angleOffset="180"
                          data-readOnly
                          data-thickness=".15"
                          className="knob"
                        />
                        <h5 className="text-muted mt-3">Total sales made today</h5>
                        <p className="text-muted w-75 mx-auto sp-line-2">
                          Traditional heading elements are designed to work best in the meat of your page content.
                        </p>
                        <div className="row mt-3">
                          <div className="col-6">
                            <p className="text-muted font-15 mb-1 text-truncate">Target</p>
                            <h4>
                              <i className="fas fa-arrow-up text-success me-1"></i>$7.8k
                            </h4>
                          </div>
                          <div className="col-6">
                            <p className="text-muted font-15 mb-1 text-truncate">Last week</p>
                            <h4>
                              <i className="fas fa-arrow-down text-danger me-1"></i>$1.4k
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col">
                          <h4 className="card-title">Account Transactions</h4>
                          <p className="card-subtitle mb-4">Transaction period from 21 July to 25 Aug</p>
                        </div>
                        <div className="col-auto">
                          <h3>
                            <i className="mdi mdi-dots-horizontal"></i>
                          </h3>
                        </div>
                      </div>
                      <div id="sparkline1" className="text-center"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
        {/* <FooterScripts /> */}
      </body>
    </div>
  );
};

export default Dashboard;
