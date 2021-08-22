import Button from '@material-ui/core/Button/Button'
import Checkbox from '@material-ui/core/Checkbox/Checkbox'
import FormControl from '@material-ui/core/FormControl/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup/FormGroup'
import FormLabel from '@material-ui/core/FormLabel/FormLabel'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField/TextField'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loginTC } from '../../state/auth-reduser'
import { AppRootStateType } from '../../state/store'

export const Login = () => {
  
    const isLoginIn=useSelector<AppRootStateType, boolean>(state=> state.authMe.isLoggedIn)
    const dispath = useDispatch()
 
    type FormikErrorType = {
       email?: string
       password?: string
       rememberMe?: boolean
    }
    
    const formik = useFormik({
       initialValues: { 
           email: '',
           password: '',
           rememberMe: false
       },
       validate: (values) => {
           const errors: FormikErrorType = {};
           if (!values.email) {
               errors.email = 'Required';
           } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
               errors.email = 'Invalid email address';
           }
           if (!values.password) {
             errors.password = 'Required';
           } else if (values.password.length < 3) {
             errors.password = 'Password must be more than 3 symbols';
           }
           return errors;
       },
       onSubmit: values => {
          // debugger
          dispath(loginTC(values))
 
           formik.resetForm()
       },
    })
    
 
    if (isLoginIn){
       return <Redirect to={'/'}/>
    }
    
   return (
     <Grid container justify="center">
       <Grid item xs={4}>
          <form onSubmit={formik.handleSubmit}>
         <FormControl>
           <FormLabel>
             <p>
               To log in get registered
               <a
                 href={"https://social-network.samuraijs.com/"}
                 target={"_blank"}
               >
                 here
               </a>
             </p>
             <p>or use common test account credentials:</p>
             <p>Email: free@samuraijs.com</p>
             <p>Password: free</p>
           </FormLabel>
           <FormGroup>
             <TextField
               label="Email"
               margin="normal"
             //   name="email"
             //   onChange={formik.handleChange}
             //   value={formik.values.email}
             //   onBlur={formik.handleBlur}
               {...formik.getFieldProps('email')}
             />
             {formik.touched.email && formik.errors.email ? <div style={{'color':'red'}}>{formik.errors.email}</div> : null}
             <TextField
               type="password"
               label="Password"
               margin="normal"
             //   name="password"
             //   onChange={formik.handleChange}
             //   value={formik.values.password}
             //   onBlur={formik.handleBlur}
               {...formik.getFieldProps('password')}
             />
             {formik.touched.password && formik.errors.password ? <div style={{'color':'red'}}>{formik.errors.password}</div> : null}
             <FormControlLabel
               label={"Remember me"}
               control={
                 <Checkbox
                   name="rememberMe"
                   onChange={formik.handleChange}
                   checked={formik.values.rememberMe}
                 />
               }
             />
             <Button type={"submit"} variant={"contained"} color={"primary"}>
               Login
             </Button>
           </FormGroup>
         </FormControl>
         </form>
       </Grid>
     </Grid>
   );
 
}
