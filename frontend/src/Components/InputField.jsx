/* eslint-disable react/prop-types */
export function InputField({ label, placeholder,value, onChange }) {
    return (
        <div>

            <div className="text-sm font-medium text-left py-2">
                {label}
            </div>
            <input onChange={onChange} value={value} className="w-full px-2 py-1 border rounded border-slate-200" type="text" placeholder={placeholder} name={label} id="na" />
        </div>)
}