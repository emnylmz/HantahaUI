import React from 'react';
import './admin-styles.css'; // Admin layout'unun stil dosyasını içe aktar

function AdminLayout() {
  return (
    <div className="admin-layout">
      <header>
        {/* Admin layout başlık veya menüler */}
      </header>
      <main>
        admin
        {/* <main>{this.props.children}</main> */}
      </main>
      <footer>
        {/* Footer */}
      </footer>
    </div>
  );
}

export default AdminLayout;