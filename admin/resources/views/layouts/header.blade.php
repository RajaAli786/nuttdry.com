<ul class="navbar-nav ms-auto">
            <!--begin::User Menu Dropdown-->
            <li class="nav-item dropdown user-menu">
              <a href="{{ route('profile') }}" class="nav-link" >
                <img
                  src="{{ asset('assets/img/user2-160x160.jpg') }}"
                  class="user-image rounded-circle shadow"
                  alt="User Image"
                />
                <span class="d-none d-md-inline">{{ $userDetails->name }} </span>
              </a>
            </li>

            <li class="nav-item ms-auto" style="border-left: 1px solid #ccc;">
                <a href="{{ route('logout') }}" class="nav-link" ><i class="bi-box-arrow-right"></i> Logout</a>
            </li>
            <!--end::User Menu Dropdown-->
          </ul>