<!doctype html>
<html lang="en">
  <!--begin::Head-->
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Admin</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource/source-sans-3@5.0.12/index.css"/>
  
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/overlayscrollbars@2.11.0/styles/overlayscrollbars.min.css"/>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"/>
    
    <link rel="stylesheet" href="{{ asset('css/adminlte.css') }}" />

  </head>
  <!--end::Head-->
  <!--begin::Body-->
  <body class="login-page bg-body-secondary">
    <div class="login-box">
      <div class="login-logo">
        <a href="javascript:void(0)"><b>Admin</b></a>
      </div>
      <!-- /.login-logo -->
      <div class="card">
        <div class="card-body py-5 login-card-body">
          <form action="{{ route('login.submit') }}" method="post">
            @csrf
            <div class="input-group mb-3">
              <input type="email" name="email" class="form-control" placeholder="Email" />
              <div class="input-group-text"><span class="bi bi-envelope"></span></div>
            </div>
            <div class="input-group mb-3">
              <input type="password" name="password" class="form-control" placeholder="Password" />
              <div class="input-group-text"><span class="bi bi-lock-fill"></span></div>
            </div>
            <!--begin::Row-->
            <div class="row">
              <div class="col-8">
                
              </div>
              <!-- /.col -->
              <div class="col-4">
                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-primary">Login In</button>
                </div>
              </div>
              <!-- /.col -->
            </div>
            <!--end::Row-->
          </form>
        
        </div>
        <!-- /.login-card-body -->
      </div>
    </div>
    <!-- /.login-box -->
    
   <!--begin::Third Party Plugin(OverlayScrollbars)-->
   <script src="https://cdn.jsdelivr.net/npm/overlayscrollbars@2.11.0/browser/overlayscrollbars.browser.es6.min.js"></script>
   <!--end::Third Party Plugin(OverlayScrollbars)--><!--begin::Required Plugin(popperjs for Bootstrap 5)-->
   
   <!--end::Required Plugin(popperjs for Bootstrap 5)--><!--begin::Required Plugin(Bootstrap 5)-->
   <script src="{{ asset('js/bootstrap.min.js') }}" ></script>
   <!--end::Required Plugin(Bootstrap 5)--><!--begin::Required Plugin(AdminLTE)-->
   <script src="{{ asset('js/adminlte.js') }}"></script>
   <!--end::Required Plugin(Admin)--><!--begin::OverlayScrollbars Configure-->
   <script>
     const SELECTOR_SIDEBAR_WRAPPER = '.sidebar-wrapper';
     const Default = {
       scrollbarTheme: 'os-theme-light',
       scrollbarAutoHide: 'leave',
       scrollbarClickScroll: true,
     };
     document.addEventListener('DOMContentLoaded', function () {
       const sidebarWrapper = document.querySelector(SELECTOR_SIDEBAR_WRAPPER);
       if (sidebarWrapper && OverlayScrollbarsGlobal?.OverlayScrollbars !== undefined) {
         OverlayScrollbarsGlobal.OverlayScrollbars(sidebarWrapper, {
           scrollbars: {
             theme: Default.scrollbarTheme,
             autoHide: Default.scrollbarAutoHide,
             clickScroll: Default.scrollbarClickScroll,
           },
         });
       }
     });
   </script>
   <!--end::OverlayScrollbars Configure-->
    <!--end::Script-->
  </body>
  <!--end::Body-->
</html>
