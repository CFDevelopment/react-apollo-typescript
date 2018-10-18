import * as React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { RouteComponentProps } from 'react-router-dom';
// import { SignupMutationVariables, SignupMutation } from '../../schemaTypes';

const signupMutation = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup (email: $email, password: $password, name: $name) {
        token
    }
  }
`;

export class RegisterView extends React.PureComponent<RouteComponentProps<{}> > {

    state = {
        email: '',
        password: '',
        name: ''
    };

    handleChange = (e: any) => {     
        const { name, value } = e.target;
        console.log('something', name, value);
        this.setState({
            [name]: value
        });
    }

    // updateEmail = (e: any) => {
    //     const { name, value } = e.target;
    //     const emailState = this.state
    //     this.setState({ email: })
    // }

    render() {
        const { password, email, name } = this.state;
        return (
            <Mutation mutation={signupMutation}> 
                {mutate=> ( 
                    <div style={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                        Register LoginView
                        <div><input type="text" name="email" placeholder="email" value={email} onChange={this.handleChange} /></div>
                        <div><input type="text" name="name" placeholder="name" value={name} onChange={this.handleChange} /></div>
                        <div><input type="password" name="password" placeholder="password" value={password} onChange={this.handleChange} /></div>
                        <button onClick={ async () => {
                            const response = await mutate({
                                variables: { email, name, password }
                            });
                            console.log('rep', response);
                            this.props.history.push('/login');
                        }}> register </button>
                    </div>
                )}
            </Mutation>
        );
    }
}