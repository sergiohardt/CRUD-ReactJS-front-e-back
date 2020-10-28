import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
	icon: 'users',
	title: 'pessoas',
	subtitle: 'CRUD de Pessoas: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/pessoas'
const initialState = {
	pessoas: { name: '', email: '', telefone: '', cpf: '' },
	list: []
}
export default class pessoasCrud extends Component{
	
	state = { ...initialState}
	
	componentWillMount(){
		axios(baseUrl).then(resp => {
			this.setState({ list: resp.data })
		})
	}
	
	clear() {
		this.setState( {pessoas: initialState.pessoas })
	}

	save() {
		const pessoas = this.state.pessoas
		const method = pessoas.id ? 'put' : 'post'
		const url = pessoas.id ? `${baseUrl}/${pessoas.id}` : baseUrl
		axios[method](url, pessoas)
			.then(resp => {
				const list = this.getUpdatedList(resp.data)
				if (pessoas !== " "){
				this.setState({ pessoas: initialState.pessoas, list })}
			})
	}

	getUpdatedList(pessoas, add = true){
		const list = this.state.list.filter(u => u.id !== pessoas.id)
		if(add) list.unshift(pessoas)
		return list
	}

	updateField(event){
		const pessoas = { ...this.state.pessoas }		
			pessoas[event.target.name] = event.target.value
			if ( event.target.value !== ''){
			this.setState({ pessoas })
		}
	}

	renderForm(){
		return (
			<div className="form">
				<div className="row">
					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>Nome</label>
							<input type="text" className="form-control" name="name" value={this.state.pessoas.name} onChange={e => this.updateField(e)} placeholder="Digite o nome..." />
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>Email:</label>
							<input type="text" className="form-control" name="email" value={this.state.pessoas.email} onChange={e => this.updateField(e)} placeholder="Digite o e-mail..." />
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>Telefone</label>
							<input type="text" className="form-control" name="telefone" value={this.state.pessoas.telefone} onChange={e => this.updateField(e)} placeholder="(99)99999-9999" />
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="form-group">
							<label>CPF:</label>
							<input type="text" className="form-control" name="CPF" value={this.state.pessoas.cpf} onChange={e => this.updateField(e)} placeholder="CPF" />
						</div>
					</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-12 d-flex justify-content-end">
						<button className="btn btn-primary" onClick={e => this.save(e)}>Salvar</button>
						<button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>Cancelar</button>
					</div>
				</div>
			</div>	
		)
	}

	load(pessoas){
		this.setState({ pessoas })
	}

	remove(pessoas){
		axios.delete(`${baseUrl}/${pessoas.id}`).then(resp => {
			const list = this.getUpdatedList(pessoas, false)
			this.setState({ list })
		})
	}

	renderTable(){
		return(
			<table className="table mt4">
				<thead>
					<tr>
						<th>ID</th>
						<th>Nome</th>
						<th>E-Mail</th>
						<th>Telefone</th>
						<th>CPF</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{this.renderRows()}
				</tbody>
			</table>
		)
	}

	renderRows(){
		return this.state.list.map(pessoas => {
			return (
				<tr key={pessoas.id}>
					<td>{pessoas.id}</td>
					<td>{pessoas.name}</td>
					<td>{pessoas.email}</td>
					<td>{pessoas.telefone}</td>
					<td>{pessoas.cpf}</td>
					<td><button className="btn btn-waring" onClick={() => this.load(pessoas)}><i className="fa fa-pencil"></i></button><button className="btn btn-danger ml-2" onClick={() => this.remove(pessoas)}><i className="fa fa-trash"></i></button></td>
				</tr>
			)
		})
	}

	render(){
		//console.log(this.state.list)
		return (
			<Main {...headerProps}>
				{this.renderForm()}
				{this.renderTable()}
			</Main>
		)
	}
}