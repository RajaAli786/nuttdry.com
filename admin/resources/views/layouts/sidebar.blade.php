<aside class="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
        <!--begin::Sidebar Brand-->
        <div class="sidebar-brand">
          <!--begin::Brand Link-->
          <a href="./index.html" class="brand-link">
            
            <!--begin::Brand Text-->
            <span class="brand-text fw-light">Admin</span>
            <!--end::Brand Text-->
          </a>
          <!--end::Brand Link-->
        </div>
        <!--end::Sidebar Brand-->
        <!--begin::Sidebar Wrapper-->
        <div class="sidebar-wrapper">
          <nav class="mt-2">
            <!--begin::Sidebar Menu-->
            <ul
              class="nav sidebar-menu flex-column"
              data-lte-toggle="treeview"
              role="navigation"
              aria-label="Main navigation"
              data-accordion="false"
              id="navigation"
            >
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="nav-icon bi bi-gear"></i>
                  <p>
                    Site Setting 
                    <i class="nav-arrow bi bi-chevron-right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="{{ route('header-setting') }}" class="nav-link">
                      <i class="nav-icon bi bi-circle"></i>
                      <p>Header</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="{{ route('sliders.index') }}" class="nav-link">
                      <i class="nav-icon bi bi-circle"></i>
                      <p>Slider</p>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a href="{{ route('footer-setting') }}" class="nav-link">
                      <i class="nav-icon bi bi-circle"></i>
                      <p>Footer</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="nav-icon bi bi-collection-fill"></i>
                  <p>
                    Categories
                    <i class="nav-arrow bi bi-chevron-right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="{{ route('categories.add') }}" class="nav-link">
                      <i class="nav-icon bi bi-circle"></i>
                      <p>Add Categories</p>
                    </a>
                  </li>
                  
                  <li class="nav-item">
                    <a href="{{ route('categories.index') }}" class="nav-link">
                      <i class="nav-icon bi bi-circle"></i>
                      <p>View Categories</p>
                    </a>
                  </li>
                </ul>
              </li>

              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="nav-icon bi bi-collection-fill"></i>
                  <p>
                    Menus
                    <i class="nav-arrow bi bi-chevron-right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="{{ route('menu.create') }}" class="nav-link">
                      <i class="nav-icon bi bi-circle"></i>
                      <p>Add Menu</p>
                    </a>
                  </li>
                  
                  <li class="nav-item">
                    <a href="{{ route('menu.index') }}" class="nav-link">
                      <i class="nav-icon bi bi-circle"></i>
                      <p>View Menu</p>
                    </a>
                  </li>
                </ul>
              </li>

              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="nav-icon bi bi-collection-fill"></i>
                  <p>
                    Testimonials
                    <i class="nav-arrow bi bi-chevron-right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="{{ route('testimonial.create') }}" class="nav-link">
                      <i class="nav-icon bi bi-circle"></i>
                      <p>Add Testimonial</p>
                    </a>
                  </li>
                  
                  <li class="nav-item">
                    <a href="{{ route('testimonial.index') }}" class="nav-link">
                      <i class="nav-icon bi bi-circle"></i>
                      <p>View Testimonial</p>
                    </a>
                  </li>
                </ul>
              </li>

              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="nav-icon bi bi-box-seam"></i>
                  <p>
                    Products
                    <i class="nav-arrow bi bi-chevron-right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="{{route('product.create')}}" class="nav-link">
                      <i class="nav-icon bi bi-circle"></i>
                      <p>Add Product</p>
                    </a>
                  </li>
                  
                  <li class="nav-item">
                    <a href="{{route('product.index')}}" class="nav-link">
                      <i class="nav-icon bi bi-circle"></i>
                      <p>View Product</p>
                    </a>
                  </li>
                </ul>
              </li>


              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="nav-icon bi bi-speedometer"></i>
                  <p>
                    Pages
                    <i class="nav-arrow bi bi-chevron-right"></i>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item">
                    <a href="{{route('pages.create')}}" class="nav-link">
                      <i class="nav-icon bi bi-circle"></i>
                      <p>Add Page</p>
                    </a>
                  </li>
                  
                  <li class="nav-item">
                    <a href="{{route('pages.index')}}" class="nav-link">
                      <i class="nav-icon bi bi-circle"></i>
                      <p>View Page</p>
                    </a>
                  </li>
                </ul>
              </li>

              <li class="nav-item">
                  <a href="{{route('coupons.index')}}" class="nav-link">
                    <i class="nav-icon bi bi-ticket-perforated"></i>
                    <p>Coupons</p>
                  </a>
              </li>

              <li class="nav-item">
                  <a href="{{route('orders.index')}}" class="nav-link">
                    <i class="nav-icon bi bi-bag-check"></i>
                    <p>Orders</p>
                  </a>
              </li>
              
              <li class="nav-item">
                    <a href="{{route('users.index')}}" class="nav-link">
                      <i class="nav-icon bi bi-person-fill"></i>
                      <p>Users</p>
                    </a>
                  </li>
              
            </ul>
            <!--end::Sidebar Menu-->
          </nav>
        </div>
        <!--end::Sidebar Wrapper-->
      </aside>