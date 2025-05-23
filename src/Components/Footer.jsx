const Footer = () => {
  return (
    <>
      {/* Top Section */}
      <footer className="bg-[#0f1f60] text-neutral-content p-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-4">
            {/* Website Logo Icon */}
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path d="M12 0C5.372 0 0 5.373 0 12c0 5.996 4.388 10.958 10.125 11.854v-8.385h-3.047V12h3.047v-2.285c0-3.007 1.792-4.675 4.533-4.675 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.49 0-1.953.926-1.953 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.958 24 17.996 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            <p>
              <strong>SmartFit</strong>
              <br />
            Your Personal
Health Coach
            </p>
          </div>

          {/* Social Icons */}
          <nav>
            <h6 className="footer-title mb-2">Social</h6>
            <div className="grid grid-flow-col gap-4">
              {/* Twitter */}
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.555-2.005.959-3.127 1.184A4.922 4.922 0 0016.616 3c-2.73 0-4.943 2.21-4.943 4.936 0 .388.045.764.127 1.124C7.69 8.832 4.066 6.865 1.64 3.905c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.099a4.904 4.904 0 01-2.237-.616v.06c0 2.386 1.697 4.374 3.946 4.828a4.936 4.936 0 01-2.224.084c.623 1.948 2.432 3.368 4.576 3.408a9.867 9.867 0 01-6.102 2.104c-.396 0-.788-.023-1.175-.067A13.945 13.945 0 007.548 21c9.142 0 14.307-7.721 14.307-14.417 0-.22-.004-.439-.014-.657A10.24 10.24 0 0024 4.557z" />
                </svg>
              </a>

              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M23.498 6.186a2.992 2.992 0 00-2.112-2.112C19.724 3.5 12 3.5 12 3.5s-7.724 0-9.386.574a2.992 2.992 0 00-2.112 2.112C0 7.848 0 12 0 12s0 4.152.502 5.814a2.992 2.992 0 002.112 2.112C4.276 20.5 12 20.5 12 20.5s7.724 0 9.386-.574a2.992 2.992 0 002.112-2.112C24 16.152 24 12 24 12s0-4.152-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M22.676 0H1.325C.593 0 0 .593 0 1.326V22.67c0 .73.593 1.324 1.325 1.324h11.497V14.71h-3.125v-3.622h3.125V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.466.099 2.798.143v3.24h-1.922c-1.506 0-1.798.716-1.798 1.766v2.317h3.596l-.469 3.622h-3.127V24h6.127c.73 0 1.324-.594 1.324-1.326V1.326C24 .593 23.407 0 22.676 0z" />
                </svg>
              </a>
            </div>
          </nav>
        </div>
      </footer>

      {/* Bottom Section */}
      <footer className="footer footer-center text-white bg-[#0f1f60]   p-4 mb-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All rights reserved by
            ACME Industries Ltd
          </p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
