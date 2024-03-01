import { AdminContentLayout } from "@/components/layout/paradise-admin/admin-content-layout"
import { Panel } from "rsuite"
import { Route, Routes } from 'react-router-dom'
import { RequestsList } from "../components/requests-list/requests-list"
import { VerificationPanel } from "../components/verification-panel/verification-panel"
import { ReportPanel } from "../components/report-panel/report-panel"

export const Receipt = () => {
    return (
        <AdminContentLayout>
            <Panel>
                <Routes>
                    <Route path='/verification-photo' element={<RequestsList type="photo" />} />
                    <Route path='/verification-id' element={<RequestsList type="id" />} />
                    <Route path='/report' element={<RequestsList type="report" />} />
                    
                    <Route path='/verification-photo/:id' element={<VerificationPanel type="photo" />} />
                    <Route path='/verification-id/:id' element={<VerificationPanel type="id" />} />
                    <Route path='/report/:id' element={<ReportPanel type="report" />} />
                </Routes>
            </Panel>
        </AdminContentLayout>
    )
}