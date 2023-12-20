import { useEffect } from "react";

type formData = {
    user:HTMLInputElement,
    pasw:HTMLInputElement
};

export default function RegisterSubmitter(){
    useEffect(() => {
        document.addEventListener('submit', (ev) => {
            ev.preventDefault();
            //@ts-ignore
            const form:formData = ev.target;
            const data = {
                user:form.user.value,
                pasw:form.pasw.value
            };

            // enviar al backend
        });
    }, []);

    return null;
};