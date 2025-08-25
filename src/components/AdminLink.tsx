import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export const AdminLink = () => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <Link to="/admin">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Admin
        </Button>
      </Link>
    </div>
  );
}; 