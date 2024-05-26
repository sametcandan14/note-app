import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Note } from "../../types";

type LayoutProps = {
  notes: Note[];
};

const Layout = ({ notes }: LayoutProps) => {
  const { id } = useParams();

  // note u bul

  const note = notes.find((n) => n.id === id);

  // note bulunmazsa anasayfaya döndür
  if (!note) {
    return <Navigate to={"/"} replace />;
  }

  // note bulunursa aşağıdakini ekrana bas
  return <Outlet context={note} />;
};

// çocuk rootlarda note a erişim saşğlayan fonksiyon

export function useNote() {
  return useOutletContext<Note>();
}

export default Layout;
