import "./DiscountCodePage.css"

function DiscountCode()
{
    return (
            <div className = "discountcode-container">
                <h1>Add a Discount Code</h1>
                <form>
                    <input type="text" placeholder="Discount Code Name" />
                </form>
                <form>
                        <input type="text" placeholder="Discount Amount" />
                </form>
                <select name="discounttype" id="discounttype">
                    <option value="dollar">$ off</option>
                    <option value="percent">% off</option>
                </select>
                <form>
                        <input type="text" placeholder="Applicable Items" />
                </form>
                <select name="applyto" id="applyto">
                    <option value="price">By Price</option>
                    <option value="manufacturer">By Manufacturer</option>
                    <option value="specific">Specific Models</option>
                </select>
                <form action="http://localhost:3000/discountcode">
                    <input type="submit" value="Create Discount Code" />
                </form>
                <form action="http://localhost:3000/admin">
                    <input type="submit" value="Back to Admin Tools" />
                </form>
            </div>
    );
}
export default DiscountCode;