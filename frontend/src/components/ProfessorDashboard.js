import React from 'react';
import './ProfessorDashboard.css'
import { Button } from 'reactstrap';

export class ProfessorDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            professors: [
                { name: 'Ben', avg_rating: 5.0 },
                { name: 'Danielle', avg_rating: 4.7 },
                { name: 'Andrew', avg_rating: 3.5 },
                { name: 'Julia', avg_rating: 4.2 }
            ],
            newProfessor: '',
            newRating: 0,
            showDeleteError: false,
            showEditForm: false,
            professorToEdit: ""
        };
        this.addProfessor = this.addProfessor.bind(this);
        this.updateProfessorInput = this.updateProfessorInput.bind(this);
        this.updateRatingInput = this.updateRatingInput.bind(this);
    }
    
    addProfessor(evt) {
        evt.preventDefault();
        if (this.state.newProfessor != undefined && this.state.newRating != undefined) {
            this.setState({showDeleteError: false});

            var newProf = { name: this.state.newProfessor, avg_rating: this.state.newRating }
            var profs = this.state.professors;
            profs.push(newProf);

            this.setState({
                professors: profs
            });
        }
    }

    updateProfessorInput(evt) {
        const val = evt.target.value;
        var profs = this.state.professors;
        var rating = this.state.newRating;

        this.state = ({
            professors: profs,
            newProfessor: val,
            newRating: rating
        });
    }

    updateRatingInput(evt) {
        const rating = evt.target.value;
        const val = this.state.newProfessor;
        const profs = this.state.professors;
        const deleteError = this.state.showDeleteError;
        const editForm = this.state.showEditForm;
        const pToEdit = this.state.professorToEdit;

        this.state = ({
            professors: profs,
            newProfessor: val,
            newRating: rating,
            showDeleteError: deleteError,
            showEditForm: editForm,
            professorToEdit: pToEdit
        });
    }

    deleteProfessor(profName) {
        var profs = this.state.professors;

        if (profs.length <= 1) {
            this.setState({showDeleteError: true});
            return;
        }

        for (var i = 0; i < profs.length; i++) {
            if (profs[i].name === profName) {
                profs.splice(i, 1);
                break;
            }
        }

        this.setState({ professors: profs });
    }

    showEditForm(profName) {
        this.setState({ showEditForm: true, professorToEdit: profName });
    }

    editProfessor(name) {
        if (this.state.newProfessor != undefined && this.state.newRating != undefined) {
            var profs = this.state.professors;
            for (var i = 0; i < profs.length; i++) {
                if (profs[i].name === name) {
                    profs[i].name = this.state.newProfessor;
                    profs[i].avg_rating = this.state.newRating;
                }
            }
            this.setState({ professors: profs });
        }
    }


    renderTableData() {
        return this.state.professors.map((professor, index) => {
        const { name, avg_rating } = professor //destructuring
        return (
            <tr key={name}>
                <td> <Button id="delete" onClick={this.deleteProfessor.bind(this, name)}> Delete </Button> &nbsp;
                     <Button id="edit" onClick={this.showEditForm.bind(this, name)}> Edit </Button> &nbsp;
                    {name} 
                    {(this.state.showEditForm && (this.state.professorToEdit===name)) 
                        ? ( <form onSubmit={this.editProfessor.bind(this, name)}>
                                <input type="text" onChange={this.updateProfessorInput}/>
                                <input type="number" id="rating" name="rating" min="1" max="5" step="0.01" onChange={this.updateRatingInput}/>
                                <input type="submit" value="Submit"/>
                            </form>
                        ) : (<></>)}
                </td>
                <td>{avg_rating} </td>
            </tr>
        )
        })
    }

    renderTableHeader() {
        let header = Object.keys(this.state.professors[0])
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }
    
    render() {
        return (
            <div>
                <h1 id='title'>Professors</h1>
                <table id='professors'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
                
                <form onSubmit={this.addProfessor}>
                    <input type="text" onChange={this.updateProfessorInput}/>
                    <input type="number" id="rating" name="rating" min="1" max="5" step="0.01" onChange={this.updateRatingInput}/>
                    <input type="submit" value="Add Professor"/>
                </form>

                {this.state.showDeleteError ? 
                    (<h3> Cannot delete. There needs to be at least 1 professor in table. </h3>) : (<> </>)}
            </div>
        )
    }
  }

  export default ProfessorDashboard;