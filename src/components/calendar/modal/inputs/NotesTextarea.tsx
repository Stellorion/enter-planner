interface NotesTextareaProps {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const NotesTextarea = ({ value = '', onChange }: NotesTextareaProps) => (
  <div>
    <label htmlFor="notes" className="block text-left text-sm font-medium text-gray-800">
      Notes
    </label>
    <textarea
      id="notes"
      name="notes"
      rows={3}
      className="mt-1 block w-full rounded-sm border border-gray-300 p-1.5 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      value={value}
      onChange={onChange}
      placeholder="Add notes (optional)"
    />
  </div>
);

export default NotesTextarea;