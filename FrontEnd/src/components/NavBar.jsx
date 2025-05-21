import React from 'react';
import { PlusIcon } from 'lucide-react';
// Use Link from react-router for client-side navigation
import { Link } from 'react-router';

function NavBar() {
  return (
    // Header with background and border
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          {/* App Title */}
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            DailyTask
          </h1>
          {/* New Note Button */}
          <div className="flex items-center gap-4">
            <Link to="/create" className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
