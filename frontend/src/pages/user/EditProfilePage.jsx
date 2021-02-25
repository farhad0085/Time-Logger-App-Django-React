import React, { useState } from "react";
import { Button, Card, CardHeader, Container, Row, Col } from "reactstrap";
import Header from "../../components/Headers/Header";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import UpdatePasswordForm from "./UpdatePasswordForm";
import UpdateProfileForm from "./UpdateProfileForm";

const EditProfilePage = () => {
    const [changePasswordBtnClicked, setChangePasswordBtnClicked] = useState(false)

    return (
        <DashboardLayout>
            <Header />
            {/* Page content */}
            <Container className="mt-5" fluid>
                <Row>
                    <Col className="order-xl-1">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">
                                            {changePasswordBtnClicked ? "Change Password" : "My account"}
                                        </h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Button
                                            color={changePasswordBtnClicked ? "danger" : "primary"}
                                            onClick={() => setChangePasswordBtnClicked(!changePasswordBtnClicked)}
                                            size="sm"
                                        >
                                            {changePasswordBtnClicked ? "Cancel" : "Change Password"}
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            {changePasswordBtnClicked ? <UpdatePasswordForm /> : <UpdateProfileForm />}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </DashboardLayout>
    );
};

export default EditProfilePage;