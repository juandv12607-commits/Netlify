// Elementos del DOM
        const simplePromptBtn = document.getElementById('simplePromptBtn');
        const validationPromptBtn = document.getElementById('validationPromptBtn');
        const passwordPromptBtn = document.getElementById('passwordPromptBtn');
        const customPrompt = document.getElementById('customPrompt');
        const closePromptBtn = document.getElementById('closePromptBtn');
        const cancelPromptBtn = document.getElementById('cancelPromptBtn');
        const confirmPromptBtn = document.getElementById('confirmPromptBtn');
        const promptInput = document.getElementById('promptInput');
        const promptTitle = document.getElementById('promptTitle');
        const promptMessage = document.getElementById('promptMessage');
        const validationMessage = document.getElementById('validationMessage');
        const result = document.getElementById('result');
        const resultText = document.getElementById('resultText');
        
        // Variables para controlar el prompt
        let currentResolve = null;
        let currentReject = null;
        let validationFunction = null;
        let inputType = 'text';
        
        // Función para mostrar el prompt personalizado
        function showCustomPrompt(options = {}) {
            // Configurar opciones por defecto
            const {
                title = 'Prompt Personalizado',
                message = 'Por favor, ingresa un valor:',
                defaultValue = '',
                placeholder = 'Escribe aquí...',
                validation = null,
                type = 'text'
            } = options;
            
            // Aplicar configuración
            promptTitle.textContent = title;
            promptMessage.textContent = message;
            promptInput.value = defaultValue;
            promptInput.placeholder = placeholder;
            validationFunction = validation;
            inputType = type;
            
            // Configurar tipo de input
            if (type === 'password') {
                promptInput.type = 'password';
            } else {
                promptInput.type = 'text';
            }
            
            // Reiniciar estado
            validationMessage.style.display = 'none';
            confirmPromptBtn.disabled = defaultValue === '';
            
            // Mostrar modal
            customPrompt.classList.add('active');
            //promptInput.focus();
            //promptInput.select();
            
            // Devolver una promesa
            return new Promise((resolve, reject) => {
                currentResolve = resolve;
                currentReject = reject;
            });
        }
        
        // Función para cerrar el prompt
        function closePrompt() {
            customPrompt.classList.remove('active');
            promptInput.value = '';
            validationMessage.style.display = 'none';
            
            // Limpiar referencias
            currentResolve = null;
            currentReject = null;
            validationFunction = null;
        }
        
        // Función para manejar la confirmación
        function handleConfirm() {
            const value = promptInput.value;
            
            // Validar si es necesario
            if (validationFunction) {
                const validationResult = validationFunction(value);
                if (validationResult !== true) {
                    validationMessage.textContent = validationResult;
                    validationMessage.style.display = 'block';
                    return;
                }
            }
            
            // Resolver la promesa con el valor ingresado
            if (currentResolve) {
                currentResolve(value);
            }
            
            closePrompt();
        }
        
        // Función para manejar la cancelación
        function handleCancel() {
            // Rechazar la promesa con null (similar al prompt nativo)
            if (currentReject) {
                //currentReject(null);
            }
            
            closePrompt();
        }
        
        // Función para validar email
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                return 'El email no puede estar vacío';
            }
            if (!emailRegex.test(email) && tt) {
                return 'Por favor ingresa un email válido';
            }
            if (!emailRegex.test(email) && !tt) {
                return 'Please enter a valid email';
            }
            return true;
        }
        
        // Función para mostrar resultado
        function showResult(text,i) {
            if(i===0)resultText1.textContent = text;
            else if(i===1)resultText2.textContent = text;
            else resultText3.textContent = text;
            result.classList.add('show');
        }
        
        // Event Listeners
        simplePromptBtn.addEventListener('click', () => {
            if(tt){
            showCustomPrompt({
                title: 'Nombre',
                message: 'Por favor, ingresa tu nombre:',
                placeholder: 'Ej: Juan Pérez'
            })
            .then(value => {
                if (value) {
                    if(tt)showResult(`Has ingresado tu nombre: "${value}"`,0);
                } else {
                    showResult('Has cancelado el prompt.',0);
                }
            });
            }else{
            showCustomPrompt({
                title: 'Name',
                message: 'Please, enter your name:',
                placeholder: 'Example: Juan Pérez'
            })
            .then(value => {
                if (value) {
                    if(!tt)showResult(`You have entered your name: "${value}"`,0);
                } else {
                    showResult('prompt cancelled.',0);
                }
            });
            }
        });
        
        validationPromptBtn.addEventListener('click', () => {
            if(tt){
            showCustomPrompt({
                title: 'Correo',
                message: 'Por favor, ingresa tu dirección de email:',
                placeholder: 'ejemplo@correo.com',
                validation: validateEmail
            })
            .then(value => {
                if (value) {
                    showResult(`Email válido ingresado: "${value}"`,1);
                } else {
                    showResult('Has cancelado el prompt.',1);
                }
            });
            }else{
            showCustomPrompt({
                title: 'Email',
                message: 'Please, enter your email:',
                placeholder: 'example@email.com',
                validation: validateEmail
            })
            .then(value => {
                if (value) {
                    showResult(`Valid email entered: "${value}"`,1);
                } else {
                    showResult('prompt cancelled.',1);
                }
            });    
            }
        });
        
        passwordPromptBtn.addEventListener('click', () => {
            if(tt){
            showCustomPrompt({
                title: 'Contraseña',
                message: 'Por favor, ingresa tu contraseña:',
                type: 'password',
                validation: (value) => {
                    if (!value) {
                        return 'La contraseña no puede estar vacía';
                    }
                    if (value.length < 6) {
                        return 'La contraseña debe tener al menos 6 caracteres';
                    }
                    return true;
                }
            })
            .then(value => {
                if (value) {
                    // En una aplicación real, no mostraríamos la contraseña
                    showResult(`Contraseña ingresada correctamente (${value.length} caracteres): "${value}"`,2);
                } else {
                    showResult('Has cancelado el prompt.',2);
                }
            });
            }else{
            showCustomPrompt({
                title: 'Password',
                message: 'Please, enter your password:',
                placeholder: 'Write here...',
                type: 'password',
                validation: (value) => {
                    if (!value) {
                        return 'The password can\'t be empty';
                    }
                    if (value.length < 6) {
                        return 'The password should have at least 6 characters';
                    }
                    return true;
                }
            })
            .then(value => {
                if (value) {
                    // En una aplicación real, no mostraríamos la contraseña
                    showResult(`Password entered correctly (${value.length} characters): "${value}"`,2);
                } else {
                    showResult('Prompt cancelled.',2);
                }
            });    
            }
        });
        
        closePromptBtn.addEventListener('click', handleCancel);
        cancelPromptBtn.addEventListener('click', handleCancel);
        confirmPromptBtn.addEventListener('click', handleConfirm);
        
        // Validación en tiempo real
        promptInput.addEventListener('input', () => {
            const value = promptInput.value;
            confirmPromptBtn.disabled = value === '';
            validationMessage.style.display = 'none';
        });
        
        ///*
        // Permitir presionar Enter para confirmar
        promptInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter' && promptInput.value.trim() !== '') {
                handleConfirm();
            }
        });
        
        // Cerrar con Escape (similar al prompt nativo)
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && customPrompt.classList.contains('active')) {
                handleCancel();
            }
        });
        

        // Cerrar haciendo clic fuera del modal
        customPrompt.addEventListener('click', (event) => {
            if (event.target === customPrompt) {
                handleCancel();
            }
        });
        //*/
        
        tt=true;
        const t = document.getElementById('t');
        const titu = document.getElementById('titu');
        const demo = document.getElementById('demo');
        const tex = document.getElementById('tex');
        const d = document.getElementById('d');
        

        t.addEventListener('click', (event) => {
            if(tt){
                simplePromptBtn.textContent = "Enter your Nickname";
                validationPromptBtn.textContent = "Enter your Email";
                passwordPromptBtn.textContent = "Enter your Password";
                d.textContent = "Data";
                t.textContent = "Translator";
                titu.textContent = "Login";
                demo.textContent = "Wellcome";
                tex.textContent = "Click on the buttons to enter your information.";
                cancelPromptBtn.textContent = "Cancel";
                confirmPromptBtn.textContent = "Confirm";
                tt=false;
                result.classList.remove('show');
                resultText1.textContent = '';
                resultText2.textContent = '';
                resultText3.textContent = '';
            }else{
                simplePromptBtn.textContent = "Ingrese su Nombre de Usuario";
                validationPromptBtn.textContent = "Ingrese su Correo";
                passwordPromptBtn.textContent = "Ingrese su Contraseña";
                d.textContent = "Datos";
                t.textContent = "Traductor";
                titu.textContent = "Inicio de Sesión";
                demo.textContent = "Bienvenido";
                tex.textContent = "Haz clic en los botones para ingresar sus datos.";
                cancelPromptBtn.textContent = "Cancelar";
                confirmPromptBtn.textContent = "Confirmar";
                tt=true;
                result.classList.remove('show');
                resultText1.textContent = '';
                resultText2.textContent = '';
                resultText3.textContent = '';
            }
        });