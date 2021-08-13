export default {
    methods: {
        getErrors(name, model) {
            const errors = [];
            if (!model.$dirty) return errors;
        
            switch (name) {
                case 'subscriber.name':
                case 'role.name':
                case "name":
                    !model.required && errors.push("Name is required.");
                    !model.maxLength && errors.push(`Name cannot be more than ${model.$params.maxLength.max} characters.`);
                    !model.minLength && errors.push(`Name cannot be less than ${model.$params.minLength.min} characters`);
                    break;
                case 'policy.name':   
                case 'company.name':    
                case 'service_provider.name':
                case 'service.name':   
                case 'limitGroup.name':
                    !model.required && errors.push("Name is required.");
                    !model.maxLength && errors.push(`Name cannot be more than ${model.$params.maxLength.max} characters.`);
                    !model.minLength && errors.push(`Name cannot be less than ${model.$params.minLength.min} characters`);
                    !model.alphaNum && errors.push(`Name can only contain numbers and characters`);
                    break;
                case 'service_provider.address':
                case 'service_provider.street':
                case 'company.address':    
                    // !model.required && errors.push("Address is required.");
                    !model.maxLength && errors.push(`Address cannot be more than ${model.$params.maxLength.max} characters.`);
                    !model.minLength && errors.push(`Address cannot be less than ${model.$params.minLength.min} characters`);
                    // !model.alphaNum && errors.push(`Address can only contain numbers and characters`)
                    break;
                case 'company.registration':    
                    !model.required && errors.push("Registration is required.");
                    !model.maxLength && errors.push(`Registration cannot be more than ${model.$params.maxLength.max} characters.`);
                    !model.minLength && errors.push(`Registration cannot be less than ${model.$params.minLength.min} characters`);
                    break;         
                case 'episode.memo_number':    
                    !model.required && errors.push("Memo number is required.");
                    !model.maxLength && errors.push(`Memo number cannot be more than ${model.$params.maxLength.max} characters.`);
                    !model.minLength && errors.push(`Memo number cannot be less than ${model.$params.minLength.min} characters`);
                    break;                        
                case 'company.street':    
                    !model.maxLength && errors.push(`Street cannot be more than ${model.$params.maxLength.max} characters.`);
                    !model.minLength && errors.push(`Street cannot be less than ${model.$params.minLength.min} characters`);
                    // !model.alphaNum && errors.push(`Street can only contain numbers and characters`)
                    break;
                case 'service_provider.contact':
                case 'company.contact':    
                    !model.required && errors.push("Contact is required.");
                    !model.maxLength && errors.push(`Contact cannot be more than ${model.$params.maxLength.max} characters.`);
                    !model.minLength && errors.push(`Contact cannot be less than ${model.$params.minLength.min} characters`);
                    !model.numeric && errors.push(`Contact can only contain numbers`)
                    break;
                case 'service.insurance_covered_limit':
                case 'service.aasandha_covered_limit':
                case 'service.self_covered_limit':    
                    !model.maxValue && errors.push(`Covered limit cannot be more than ${model.$params.maxValue.max} characters.`);
                    !model.minValue && errors.push(`Covered limit cannot be less than ${model.$params.minValue.min} characters`);
                    !model.decimal && errors.push(`Covered limit can only contain decimals`)
                    break;
                case 'service.limit_total':      
                    !model.required && errors.push("Service price is required.");              
                    !model.maxValue && errors.push(`Covered limit cannot be more than ${model.$params.maxValue.max} characters.`);
                    !model.minValue && errors.push(`Covered limit cannot be less than ${model.$params.minValue.min} characters`);
                    !model.decimal && errors.push(`Covered limit can only contain decimals`)   
                    break; 
                case 'service.description':
                case 'limitGroup.description':    
                    !model.maxLength && errors.push(`Description cannot be more than ${model.$params.maxLength.max} characters.`);
                    !model.alphaNum && errors.push(`Description can only contain numbers and characters`);
                    break;
                case 'service.service_type_id':
                case 'service.service_limit_group_id':
                case 'service.service_id':
                    !model.required && errors.push("This field is required.");
                    break;
                case "company.email":
                    !model.email && errors.push("Not a valid e-mail.");
                    break;
                case "email":
                    !model.email && errors.push("Not a valid e-mail.");
                    !model.required && errors.push("E-mail is required.");
                    break;
                case "subscriber.national_id":
                    !model.minLength && errors.push("Invalid national ID.");
                    !model.required && errors.push("National ID is required.");
                break;
                case "subscriber.passport":
                    !model.required && errors.push("Passport is required.");
                break;  
                case "subscriber.work_permit":
                    !model.required && errors.push("Work permit is required.");
                break;                                
                default:
                    break;
            }
            return errors;
        },
        validate() {
            this.$v.$touch();
            if (this.$v.$invalid) {
              return;
            }
          },
    }
}