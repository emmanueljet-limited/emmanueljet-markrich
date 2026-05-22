import { getTemplates } from '@/lib/getTemplates';
import ClientPage from '../components/ClientPage';

export default function Page() {
  const templates = getTemplates();
  return <ClientPage templates={templates} />;
}
