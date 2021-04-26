import React, {useState} from "react";
import SurveyTitle from "./SurveyTitle";
import useInputValue from "../../hooks/useInputValue";
import Question from "../../models/Question";
import ListController from "../../controllers/ListController";
import {Button, Container, Row} from "react-bootstrap";
import QuestionList from "./QuestionList";

import './SurveyBuilder.css';
import '../styles/inputs.css';

const SurveyBuilder = ({initTitle, initQuestions, handleSurveySubmit}) => {
    const [title, handleChangeTitle] = useInputValue(initTitle);
    const [questions, setQuestions] = useState(initQuestions);
    const [activeId, setActiveId] = useState(0);

    const listController = new ListController(questions, setQuestions);

    const handleSubmit = () => {
        handleSurveySubmit({
            title: title,
            questionSet: questions
        })
    }

    // TODO: Create validation for simple forms

    return (
        <Container size="xl">
            <SurveyTitle
                title={title}
                handleChangeTitle={handleChangeTitle}
            />

            <QuestionList
                activeId={activeId}
                setActiveId={setActiveId}
                questions={questions}
                listController={listController}
            />

            <Row className="survey-builder-row justify-content-center">
                <Button variant="primary" size="lg" onClick={() => listController.add(new Question())}>
                    <i className="fas fa-plus icon"></i>
                    {' '}
                    Додати питання
                </Button>
            </Row>
            <Row className="survey-builder-row justify-content-center">
                <Button variant="success" size="lg" onClick={handleSubmit}>
                    <i className="fas fa-paper-plane"></i>
                    {' '}
                    Зберегти опитування
                </Button>
            </Row>
        </Container>
    );
}

export default SurveyBuilder;
