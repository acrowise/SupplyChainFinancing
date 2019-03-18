/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for ledger state
const State = require('./../ledger-api/state.js');

// Enumerate commercial paper state values
const cpState = {
    PURCHASE: 1,
	INVOICE: 2,
	ISSUE: 3,
	CONFIRM: 4,
	DEPOSIT: 5,
	APPROVE: 6,
	PAY: 7
};

/**
 * CommercialPaper class extends State class
 * Class will be used by application and smart contract to define a paper
 */
class CommercialPaper extends State {

    constructor(obj) {
        super(CommercialPaper.getClass(), [obj.issuer, obj.paperNumber]);
        Object.assign(this, obj);
    }

    /**
     * Basic getters and setters
    */
    getIssuer() {
        return this.issuer;
    }

    setIssuer(newIssuer) {
        this.issuer = newIssuer;
    }

    getOwner() {
        return this.owner;
    }

    setOwner(newOwner) {
        this.owner = newOwner;
    }

    /**
     * Useful methods to encapsulate commercial paper states
     */
	setPurchase() {
		this.currentState = cpState.PURCHASE;
	}
	setInvoice() {
		this.currentState = cpState.INVOICE;
	}
    setIssue() {
        this.currentState = cpState.ISSUE;
    }
	setConfirm() {
		this.currentState = cpState.CONFIRM;
	}
	setDeposit() {
		this.currentState = cpState.DEPOSIT;
	}
	setApprove() {
		this.currentState = cpState.APPROVE;
	}
	setPay() {
		this.currentState = cpState.PAY;
	}
	isPurchase() {
		return this.currentState === cpState.PURCHASE;
	}
	isInvoice() {
		return this.currentState === cpState.INVOICE;
	}
    isIssue() {
        return this.currentState === cpState.ISSUE;
    }
	isConfirm() {
		return this.currentState === cpState.CONFIRM;
	}
    isDeposit() {
        return this.currentState === cpState.DEPOSIT;
    }
	isApprove() {
		return this.currentState === cpState.APPROVE;
	}
    isPay() {
        return this.currentState === cpState.PAY;
    }

    static fromBuffer(buffer) {
        return CommercialPaper.deserialize(Buffer.from(JSON.parse(buffer)));
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to commercial paper
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, CommercialPaper);
    }

    /**
     * Factory method to create a commercial paper object
     */
    static createInstance(issuer, paperNumber, issueDateTime, maturityDateTime, faceValue) {
        return new CommercialPaper({ issuer, paperNumber, issueDateTime, maturityDateTime, faceValue });
    }

    static getClass() {
        return 'org.papernet.commercialpaper';
    }
}

module.exports = CommercialPaper;

